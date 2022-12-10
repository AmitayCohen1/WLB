
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useChallengesContext } from "../hooks/useChallengeContext"
// import AWS from 'aws-sdk';

import axios from "../config/axios";


  //AWS
//   const bucketRegion = process.env.REACT_APP_BUCKET_REGION

//   AWS.config.update({
//    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
//    region: bucketRegion
//  });

const CreateChild = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { challengeDispatch } = useChallengesContext();
    const [uploadStart, setUploadStart] = useState(false);
    const [uploadFinish, setUploadFinish] = useState(false);

    const [reps, setReps] = useState('');
    const [file, setFile] = useState();
    const [progress, setProgress] = useState(0);
    const [isloading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
  
    const [isFileSize, setIsFileSize] = useState(false);





//Validating file size
  const validateSelectedFile = (selectedFile) => {
    const MAX_FILE_SIZE = 512000  // 500MB
    if (!selectedFile) {
      setErrorMsg("Please choose a file");
      setIsFileSize(false)
      console.log('choose A file')
      return
    }

    const fileSizeKiloBytes = selectedFile.size / 1024

    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      setErrorMsg("Please upload a video that is less than 500mb");
      setIsFileSize(false)
      console.log('file is to big1')
      return
    }
    setErrorMsg("file is to big2")
    setIsFileSize(true)

    };



    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        validateSelectedFile(selectedFile);
        setFile(selectedFile);
      };
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isFileSize){
        setIsLoading(true);
        setUploadStart(true);


        //Get Signed URL
        const fileType = file.type;
        const signedUrlObject = await axios.get('/api/challenges/s3Url', {
          params: {fileType}
        });

        const signedUrl = signedUrlObject.data.data.uploadURL
        const fileName = signedUrlObject.data.data.fileName


        //Upload to S3
        try { 
            const uplaodResoponse = await axios.put(signedUrl, file, {
              headers: {
                "Content-Type": "multipart/form-data"
              }, 
                onUploadProgress: function(progressEvent) {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setProgress(progress);
              }, 
              partSize: 5 * 1024 * 1024, // 5MB chunk sizes.
              queueSize: 1 // Number of concurrent upload requests
            });

            setUploadStart(false)
            setUploadFinish(true);
            
          } catch(err) { 
            console.log(err)
          }

        setTimeout( async () => {
          const url = 'https://ddi556n39z2z8.cloudfront.net/' + fileName;

         //Upload to mongo
          const form = new FormData();
          form.append("userEmail", user.userName);
          form.append("userName", user.userName);
          form.append("organization", user.organization);
          form.append("reps", reps);
          form.append("fileName", fileName);
          form.append("fileURL", url);

        try {
             const res = await axios.post(`/api/challenges/reply/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${user.token}` // TODO: "Authorization"
                },  
            })
            const payload = res;
            challengeDispatch({ type: "REPLY", payload: payload.data });
            navigate(`/${id}`);  
            setIsLoading(false);
        } catch (err) {
            console.log("[ERROR][handleSubmit]: " + err.message);
        }
      }, 2000);
    };
}
   
    return (
        <div>
            <div className=" py-4 text-white flex 
                px-4
                sm:px-8
                md:px-10
                lg:px-28 
                xl:px-64
                ">
                <Link className="rounded-full bg-stone-500 py-2 px-2 cursor-pointer bg-opacity-40 hover:bg-stone-700" to={`/${id}`}><AiOutlineArrowLeft /></Link>
            </div>
                <div className=" rounded-xl py-8
                px-4
                sm:px-8
                md:px-10
                lg:px-28 
                xl:px-64 ">
                    <div className="lg:grid  lg:place-content-center lg:pt-12">
                        <form className="grid rounded-xl lg:w-96" onSubmit={handleSubmit}>
                            <h1 className="font-bold text-5xl text-white">Beat it!</h1>
                            <div className="text-white py-4">Big files over 50mb can take a long time to upload. <br/> Please compress your large file using <a className="text-red underline" href="https://www.veed.io/tools/video-compressor" target="_blank" rel="noreferrer">veed.io</a>. <br/> Thank you.</div>
                            <input
                                className="rounded p-3  text-stone-300 pr-20 placeholder:text-stone-400 
                                mb-4 bg-stone-900 border-stone-600 border hover:border-red 
                                outline-none focus:border-red input:invalid input:text-white "
                                placeholder="Reps"
                                required type="number"
                                onChange={e => setReps(e.target.value)}
                                value={reps} />

                            <input 
                                required
                                accept="video/*"
                                className="text-sm text-slate-500
                                file:py-3 file:px-11  file:mx-2 pb-6
                                file:rounded-full file:bg-stone-900 file:cursor-pointer file:text-stone-400 file:border file:border-solid file:border-stone-600 
                                hover:file:border-red"
                                name="file"
                                type="file"
                                id='file'
                                onChange={handleFileChange}
                            />
                             <p className='text-white pt-2'>Upload Progress:</p>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <p className='text-white'>{uploadStart ? 'Uploading...' : uploadFinish ? 'Done - You’re on the Board!' : ''}</p>
              <div className={progress > 0 ? "bg-yellow text-xs font-medium text-black text-center p-1 py-2 leading-none rounded-full W-full" : "text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"} style={{width: progress}}>{progress}%</div>
            </div>
                            {!isFileSize && <p className="text-amber-700 text-center pt-2">{errorMsg}</p>}
                            <button className="bg-red py-3 rounded px-28 hover:bg-hoverRed text-stone-900 font-semibold  hover:text-stone-200 mt-4">Submit</button>          
                        </form>
                    </div>
            </div>
        </div>

    )}


export default CreateChild;










