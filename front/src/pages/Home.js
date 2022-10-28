import {useChallengesContext} from '../hooks/useChallengeContext'
import { Link} from "react-router-dom"
import { useEffect } from 'react';
import Parents from '../components/Parents';

import axios from "../config/axios";

const Home = () => {
  const {challenges, challengeDispatch} = useChallengesContext();


  //Check Challenges
  useEffect(() => { 
    const fetchingData = async () => {
      try {
        const response = await axios.get("/api/challenges");
        challengeDispatch({type: "SET_CHALLENGES", payload: response.data});
      } catch (err) {
        console.log("response is NOT OK :( This is what we got bac:", err.message);
      }
    }
    if (!challenges) { 
      console.log("fetchingData");
      fetchingData();
    }
  }, [challengeDispatch, challenges]);

  const copy = `Post a personal record or break someone else's.
  Earn a badge. Show up your friends.`

  const splitHeadline = copy.split('.')
  console.log(splitHeadline[1])
  
if(challenges) { 
    return ( 
        <div className="flex-col">
          <h1 className="
          text-6xl px-4 pt-10 font-semibold text-white
          font-Inter
          sm:px-6 
          md:px-8
          lg:px-28 
          xl:px-64
          ">
          Are you the GOAT? Prove it.</h1>
          <h1 className='text-white
          font-Inter
          pt-6
          pb-8
          px-4
          sm:px-6 
          md:px-8
          lg:px-28 
          xl:px-64'>
          <div>{splitHeadline[0] + '.' + splitHeadline[1]}.</div>
            <div>{splitHeadline[2]}.</div>
              </h1>
                <div>
                  <div className="
                  grid place-items-center  py-2 rounded-xl text-white
                  grid-cols-2 
                  gap-6
                  px-4
                  sm:px-6 
                  md:px-8
                  lg:px-28 
                  xl:px-64

                  sm:grid-cols-2 
                  md:grid-cols-3
                  lg:grid-cols-3 
                  xl:grid-cols-3 
                  2xl:grid-cols-4 
             
                  ">
                  {challenges && challenges.map((challenge) => (
                  <Link
                  to={`/${challenge._id}`}
                  key={challenge._id}
                  >
                  <Parents key={challenge._id} challenge={challenge}/> 
                  </Link>
                  ))}
              </div>
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