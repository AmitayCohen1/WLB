import React, { useState } from 'react';
import axios from "../config/axios";
import { useChallengesContext } from '../hooks/useChallengeContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate} from 'react-router-dom';
// import AWS from 'aws-sdk';



 //AWS
//  const bucketRegion = process.env.REACT_APP_BUCKET_REGION

//  AWS.config.update({
//   accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
//   region: bucketRegion
// });

const CreateParent = () => {
  const { user } = useAuthContext()
  const { challengeDispatch } = useChallengesContext();
  const [file, setFile] = useState(null);
  const [uploadStart, setUploadStart] = useState(false);
  const [uploadFinish, setUploadFinish] = useState(false);

  const [isFileSize, setIsFileSize] = useState(false);
  const [isloading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate()


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reps, setReps] = useState('');
  const [isLessReps, setIsLessReps] = useState(false);



  //Checking reps order 
  const handleCheckBokChange = (event) => {
    if (isLessReps !== event.target.checked){
      setIsLessReps(event.target.checked);
    } else {
      setIsLessReps(!event.target.checked);
    } 
  };

  //Validating file size
  const validateSelectedFile = (selectedFile) => {
    const MAX_FILE_SIZE = 512000  // 500MB
    if (!selectedFile) {
      setErrorMsg("Please choose a file");
      setIsFileSize(false)

      return
    }


    const fileSizeKiloBytes = selectedFile.size / 1024

    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      setErrorMsg("Please upload a video that is less than 500mb");
      setIsFileSize(false)

      return
    }
    setErrorMsg("file is to big2")
    setIsFileSize(true)
    };


  //OnChange file checking 
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateSelectedFile(selectedFile);
    setFile(selectedFile);
  };
  

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isFileSize) {
      setIsLoading(true);
  
      // Update state
      setUploadStart(true);

      const fileType = file.type;
      const signedUrlObject = await axios.get('/api/challenges/s3Url', {
        params: {fileType}
      });

      const signedUrl = signedUrlObject.data.data.uploadURL
      const fileName = signedUrlObject.data.data.fileName

      try { 
        await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": "multipart/form-data"
          }, 
            onUploadProgress: (progressEvent) => {
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
     
      setTimeout(async () => { 
        const form = new FormData();
        const url = 'https://ddi556n39z2z8.cloudfront.net/' + fileName;
        form.append("fileName", fileName);
        form.append("userEmail", user.email);
        form.append("userName", user.userName);
        form.append("organization", user.organization || null);
        form.append("title", title);
        form.append("description", description);
        form.append("reps", reps);
        form.append("isLessReps", isLessReps);
        form.append("fileURL", url);
        try { 
          const payload = await axios.post('/api/challenges/', form, { 
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log(payload.data)
          await challengeDispatch({ type: "CREATE_CHALLENGE", payload: payload.data.SavedChallenge});
          navigate(`/${payload.data.SavedChallenge._id}`);  
          setIsLoading(false);
        } catch (err) { 
          console.log(err)
        }
    }, 2000)

    }    
};


  return (
    <div className="bg-black h-screen py-8 px-4 sm:px-8 md:px-10 lg:px-28  xl:px-64">
      <div className=" rounded-xl  lg:grid  lg:place-content-center lg:pt-24  ">
        <form className="grid  rounded-xl" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full h-full px-3 ">
            <h1 className="font-bold text-5xl pb-10 text-white ">Set A World Record!</h1>

            {/* Title */}
            <input required
              className="rounded p-3 w-full  text-stone-300 pr-20 placeholder:text-stone-400 mb-4 bg-stone-900 border-stone-600 border hover:border-red outline-none focus:border-red "
              placeholder="Challenge title"
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
              maxLength="18"
            />
          
            {/* Description */}
            <input required
              className="rounded w-full py-6 px-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 
              block bg-stone-900 border-stone-600 border hover:border-red outline-none 
              focus:border-red "
              placeholder="Description"
              type="text"
              onChange={e => setDescription(e.target.value)}
              value={description}
              maxLength="200"
            />

            {/* Reps */}
            <input
              className="rounded p-3 w-full text-stone-300 pr-20 placeholder:text-stone-400 
              mb-4 bg-stone-900 border-stone-600 border hover:border-red 
              outline-none focus:border-red"
              placeholder="Score"
              required
              type="number"
              onChange={e => setReps(e.target.value)}
              value={reps} 
            />

            <div className=" place-items-center place-content-between text-stone-400 flex mb-4">
              <p className=" w-max"> Best score is</p>
              <div className="flex">
                <FormControlLabel 
                  control={
                    <Checkbox checked={!isLessReps} onChange={handleCheckBokChange}
                    className= "border-stone-400"
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{color:"rgb(214 211 209)"}} />
                  } 
                  label="Highest"
                  labelPlacement="start"
                  className="rounded  text-stone-400  placeholder:text-stone-400 
                  text-center place-items-center place-content-center"            
                />
                <FormControlLabel 
                  control={
                    <Checkbox
                    checked={isLessReps}
                    onChange={handleCheckBokChange}
                    className= "border-stone-400"
                    inputProps={{ 'aria-label': 'controlled' }}
                    style={{color:"rgb(214 211 209)"}} />
                  } 
                  label="Lowest"
                  labelPlacement="start"
                  className="rounded text-stone-400  placeholder:text-stone-400 
                  text-cente place-items-center place-content-center"
                />
              </div>
            </div> 

            <input 
              required
              accept="video/*"
              className="text-sm text-stone-400 w-full file:py-3 file:px-11  file:mr-6
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
              <div className={progress > 0 ? "bg-yellow text-xs font-medium text-black text-center p-0.5 leading-none rounded-full W-full" : "text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"} style={{width: progress}}>{progress}%</div>
            </div>
            {!isFileSize && <p className="text-red pt-2 text-left">{errorMsg}</p>}
            <div className="text-white pb-4">Big files over 50mb can take a long time to upload. <br/> Please compress your large file using 
              <a className="text-red underline" href="https://www.veed.io/tools/video-compressor" target="_blank" rel="noreferrer">veed.io</a>. 
              <br/> Thank you.
            </div>
            <button className="bg-red py-3 w-full rounded px-28 hover:bg-hoverRed  text-stone-900 font-semibold  hover:text-stone-200">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
};



export default CreateParent;