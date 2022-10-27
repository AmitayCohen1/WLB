
import { useState } from "react";
import {useChallengesContext} from '../hooks/useChallengeContext'
import {useAuthContext} from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const CreateParent = () => { 
  
const navigate = useNavigate()
const {challengeDispatch} = useChallengesContext();
const {user} = useAuthContext()
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [reps, setReps] = useState('');
const [file, setFile] = useState();
const [isloading, setIsLoading] = useState(false)
    
const handleSubmit = async (e) => { 
  
  e.preventDefault()

  if(!user) { 
  navigate('/')
  return
  }
  const form = new FormData();
  form.append('userEmail', user.email)
  form.append('userName', user.userName)
  form.append('title', title);
  form.append('description', description);
  form.append('reps', reps);
  form.append('file', file);
  setIsLoading(true);




  const response = await axios.post('http://localhost:4000/api/challenges', form, { 
    headers: { 
      'Autharization': `Bearer ${user.token}`,
      'Content-Type': 'multipart/form-data',
      }, 
    onUploadProgress: (progressEvent) => {
      let {loaded, total} = progressEvent;
      console.log((loaded / total) * 100)
    }
  })
  
  console.log('this is the result:', response)
  console.log('this is the result as JSON:', response.data)

  // const response = await fetch('http://localhost:4000/api/challenges', { 
  // method: 'POST',
  // headers : { 
  //   'Autharization': `Bearer ${user.token}`
  // },
  // body: form
  // })
  // console.log('this is the fetch response,', response)
  // const json = await response.json();

  const json = response.data

  challengeDispatch({type:'CREATE_CHALLENGE', payload: json})
  if(response.statusText === 'OK') {
    console.log('Seems good:', response.statusText) 
    setTitle('');
    setDescription('');
    setReps('');
    setFile();
    navigate('/')
  } else { 
    console.log('Seems bad:', response.statusText) 
  }
}

if(isloading){
  return ( 
<div className=" grid place-items-center h-screen bg-black " role="status">
      <svg aria-hidden="true" className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-red" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
      </svg>
      <span className="sr-only">Loading...</span>
  </div>
  )
}
  return( 
    <div className="grid place-items-center bg-black h-screen pb-20"> 
      <div className="bg-stone-900 p-8 rounded-xl m-2">
        <form className="grid   bg-stone-900 p-8 rounded-xl" onSubmit={handleSubmit}> 

          <h1 className="font-bold text-4xl pb-10 text-white ">Set A World Record!</h1>

          <input required 
          className="rounded p-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 block bg-stone-900 border-stone-600 border hover:border-red  outline-none focus:border-red "
          placeholder="Challenge title"
          type="text" 
          onChange={e => setTitle(e.target.value)} 
          value={title}
          maxLength="18"
          />

          <input required 
          className="rounded py-6 px-3 text-stone-300 pr-20 placeholder:text-stone-400 mb-4 
          block bg-stone-900 border-stone-600 border hover:border-red outline-none 
          focus:border-red "
          placeholder="Description"
          type="text" 
          onChange={e => setDescription(e.target.value)} 
          value={description} 
          maxLength="200"
          />

          <input 
          className="rounded p-3  text-stone-300 pr-20 placeholder:text-stone-400 
          mb-4 bg-stone-900 border-stone-600 border hover:border-red 
          outline-none focus:border-red"
          placeholder="Reps"
          required 
          type="number" 
          onChange={e => setReps(e.target.value)} 
          value={reps}/>

          <input required 
          className="text-sm text-slate-500
          file:py-3 file:px-11  file:mr-6 mb-8
          file:rounded-full file:bg-stone-900 file:cursor-pointer file:text-stone-400 file:border file:border-solid file:border-stone-600 
          hover:file:border-red" 
          name="file" 
          type="file" 
          id='file' 
          onChange={e => { 
          const file = e.target.files[0] 
          setFile(file)}} 
          />

          <button  className="bg-red py-3 rounded px-28 hover:bg-hoverRed  text-stone-900 font-semibold mb-5 hover:text-stone-200">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateParent; 