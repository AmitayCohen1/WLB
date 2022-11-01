import { useEffect, useState } from "react"
import Row from '../components/Row'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useChallengesContext } from '../hooks/useChallengeContext'
import { AiOutlineArrowLeft } from "react-icons/ai"
import ReactPlayer from 'react-player'

import axios from "../config/axios";


const ChallengePage = () => {

  const { challengeParamsId } = useParams()
  const { challenges, challengeDispatch } = useChallengesContext();
  const [sortedList, setSortedList] = useState([])
  const [parent, setParent] = useState()
  const navigate = useNavigate()
  const [ending, setEnding] = useState('')
  const [hover, setHover] = useState()


  if (ending) {
    console.log(ending)
  }


  useEffect(() => {
    const userMissData = async () => {
      if (!challenges) {
        try {
          const response = await axios.get("/api/challenges");

          challengeDispatch({ type: "SET_CHALLENGES", payload: response.data });
        } catch (err) {
          console.log("[ERROR][userMissData]: " + err.message);
        }
      } else {
        try {
          const responseS3 = await axios.get(`/api/challenges/${challengeParamsId}`);

          challengeDispatch({ type: "REPLY", payload: responseS3.data });
          setParent(responseS3.data);
        } catch (err) {
          navigate("/");
        }
      }
    };
    userMissData();
  }, [challengeParamsId, challengeDispatch, challenges, navigate]);

  const comparator = (a, b) => {
    return b.reps - a.reps
  }

  const creatingList = async () => {
    if (parent) {
      const parentObject = {
        userName: parent.userName,
        userEmail: parent.userEmail,
        reps: parent.reps,
        fileURL: parent.fileURL,
        _id: parent._id
      }
      const list = [parentObject, ...parent.replies]
      const final = await list.sort(comparator);
      setSortedList(final)
    }
  }
  creatingList()




  //Seting ending 
  const repsEnding = async (index) => {
    const position = await index + 1;
    if (String(position).slice(-1) === '1') {
      setEnding('th')
      return
    } else if (String(position).slice(-1) === '2') {
      setEnding('th')
      return
    } else if (String(position).slice(-1) === '3') {
      setEnding('th')
      return
    } else {
      setEnding('what')
      return
    }
  }


  if (parent) {
    return (
      <div className="bg-stone-900 pb-4">
        <div className=" text-white items-center flex place-content-between py-4 mx-4
      sm:mx-10
      md:mx-12
      lg:mx-28
      xl:mx-64
      ">
          <Link className="rounded-full bg-stone-800 py-2 px-2 cursor-pointer  hover:bg-stone-700" to='/'><AiOutlineArrowLeft /></Link>

        </div> {/* Image */}
        <div className='
        bg-stone-900
        rounded-xl 
        grid 
        grid-cols-5
        break-all
        sm:flex-row
        mx-4
        sm:mx-10 sm:pb-6
        md:mx-12 <Video source={challenge.fileURL} />
        lg:mx-28
        xl:mx-64'>

          {/* <ReactPlayer 
          className='flex-1 object-cover' 

          // width='100%'
          // height='100%'
          url={parent.fileURL} 
          controls={hover ? true : false}
          onMouseEnter={(e) => {
              setHover(true)
              e.target.play()
            }}
            onMouseLeave={(e) => {
              setHover(false)
              e.target.pause()
            }}

          /> */}


          <div
         className='
        h-[400px] w-full aspect-square bg-black bg-opacity-0 rounded-xl shadow-indigo-500/40 object-cover 
        col-span-5
        md:col-span-3
        xl:col-span-2
        xl:h-[500px]
        '>
        <ReactPlayer 
          controls
           className='object-cover'
            width='100%'
            height='100%' 
            url={parent.fileURL}
          />
          </div>

          {/* <video 
          controls={hover ? true : false}
            type="video/mp4"
            onMouseEnter={(e) => {
              setHover(true)
              e.target.play()
            }}
            onMouseLeave={(e) => {
              setHover(false)
              e.target.pause()
            }}
            className='
        h-[400px] w-full aspect-square bg-black bg-opacity-0 rounded-xl shadow-indigo-500/40 object-cover 
        col-span-5
        md:col-span-3
        xl:col-span-2
        xl:h-[500px]
        '>
            <source src={parent.fileURL} type='video/mp4' />
          </video> */}




          <div className=' text-white
          md:col-span-2
          col-span-5
          md:py-0
          pt-4
          md:pl-8
        '>

            <div className="flex place-content-between md:flex-col ">
              <h1 className=
                'font-JockeyOne text-3xl font-semibold uppercase sm:block inline md:text-5xl  text-red lg:text-5xl xl:text-6xl sm:mb-1 break-normal'>{parent.title}</h1>
              <h1 className=
                'text-sm font-light float-right inline sm:float-none pt-4 sm:pt-1 text-createdByColor'>Created by <span className="font-bold">{parent.userName}</span></h1>
            </div>

            <h1 className=
              'text-createdByColor text-opacity-80 font-light text-sm  md:pb-2'>
              {parent.description}
            </h1>
            <Link className="
          bg-yellow 
            lg:text-lg
            py-3 text-md mt-6 mb-4 px-5 text-black font-semibold 
            rounded-full hover:bg-amber-500 inline-block"
              to={`/reply/${parent._id}`}>Get on the board
            </Link>
          </div>
        </div>


        <h1 className='text-white text-4xl font-JockeyOne font-semibold uppercase py-4
        mx-4
        sm:mx-10
        md:mx-12
        lg:mx-28
        xl:mx-64
      '>Leaderboard</h1>
        <div className='grid grid-cols-12 overflow-hidden font-semibold text-sm md:text-lg font-inter mb-3 text-white bg-stone-200 bg-opacity-0 border-b border-stone-500
        mx-4
        sm:mx-10
        md:mx-12
        lg:mx-28
        xl:mx-64
     '> {/* Title */}
          <div className=' col-span-3 my-2'>Record</div>
          <div className=' col-span-2 xl:col-span-2 my-2 pl-2 '>Name</div>
          <div className=' col-span-1 xl:col-span-1 my-2 pr-2 '>Rank</div>
          <div className='my-2 pl-2
        col-span-2 
        md:col-span-2
        xl:col-span-2
        2xl:col-span-2
        '>Score</div>
          <div className='col-span-3 xl:col-span-1 my-2 text-center'>Badge</div>
        </div>

        <div className='grid gap-3 mb-4 '>
          {sortedList.length === 1 ?
            <Row
              key={parent._id}
              index=''
              challenge={parent}
              parent={parent}
            />
            : sortedList.length > 1 ? sortedList.map((child, index) => (
              <Row
                key={child._id}
                index={index}
                challenge={child}
                parent={parent}
              />
            )
            ) : <h1 className="text-white">What's going on?</h1>}
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

export default ChallengePage;