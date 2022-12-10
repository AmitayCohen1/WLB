import {useChallengesContext} from '../hooks/useChallengeContext'
import { Link} from "react-router-dom"
import { useRef, useState } from 'react';
import Parents from '../components/Parents';


import axios from "../config/axios";

const Home = () => {
  const {challenges, challengeDispatch} = useChallengesContext();
  const [content, setContent] = useState('')
  const [message, setMessage] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState(false)
  const [placeHold, setPlaceHold] = useState('(Email me hot records)')
  const inputRef = useRef(null);

  // const placeHold = 'Email me new records'



  //Send Amitay1599@gmail.com the content 
const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(true)
      await axios.post('/api/email', {
      data: content
    }).then((res) => { 
      setContent(`You're In!`)
    })
  }
  
if(challenges) { 
    return ( 
        <div className="flex-col">
          <h1 className="
          text-5xl xl:text-7xl 
          pt-10 font-semibold text-white
          font-Inter
          px-4
          sm:px-6 
          md:px-8
          lg:px-28 
          xl:px-64">
          Are you the GOAT? <br/> Prove it.</h1>

          <div className=' pb-10 pt-6 md:flex md:place-content-between
          lace-content-between            
          px-4
          sm:px-6 
          md:px-8
          lg:px-28 
          xl:px-64'> 

          <div className='sm:flex place-content-between w-full'>
          <h1 className='text-white text-opacity-85 font-Inter text-base xl:text-lg 2xl:text-xl text-opacity-85 font-light'>
          Post a personal record or break someone else's. <br/> Earn a badge. Show up your friends.</h1>
              <div className='text-white pt-8 sm:pt-0'>
                <form  
                  className='flex'
                  onSubmit={handleSubmit}>
                  <input  
                    onChange={(e) => { 
                      setContent(e.target.value)} 
                    }
                  value={content}
                  placeholder={placeHold}
                  ref={inputRef}
                  id='inputRe'
                  className='
                  placeholder:text-black
                  placeholder:font-light 
                  placeholder:italic
                  focus:outline-none
                  italic
                  text-black
                  font-light
                  sm:-ml-2
                  pl-4 py-2 bg-white rounded-l-lg pr-2 text-md  border-yellow '          
                  />
                  <button className='pl-2 hover:bg-red font-light text-black rounded-r-lg px-2 -ml-1 bg-yellow '>Send'em</button>
                  </form>
                  </div>
              </div> 
            </div>
                

          <div className="
          grid 
          rounded-xl text-white
          grid-cols-2 
          gap-6
          px-4
          sm:px-6 
          md:px-8
          lg:px-28 
          xl:px-64
          md:grid-cols-3
          xl:grid-cols-4 
          ">
              {challenges && challenges.map((challenge) => (
              <Link to={`/${challenge._id}`} key={challenge._id} className='none'>
                <Parents key={challenge._id} challenge={challenge}/> 
              </Link>
              ))}
        </div>
      </div>
    )
  } else { 
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
}

export default Home;