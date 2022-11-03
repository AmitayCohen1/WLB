import { useChallengesContext } from '../hooks/useChallengeContext'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';

import axios from "../config/axios";
import ReactPlayer from 'react-player'

const Parents = ({ challenge }) => {
    const { challengeDispatch } = useChallengesContext();
    const { user } = useAuthContext();
    const [hover, setHover] = useState();
    const handleDelete = async (e) => {
        console.log("deleting");
        e.preventDefault();
       


        if (user) {
            try {
                const response = await axios.delete(`/api/challenges/${challenge._id}`, {
                    headers: {
                        "Autharization": `Bearer ${user.token}`, // TODO: "Authorization"
                    },
                });
                const deleteFile = await challengeDispatch({ type: "DELETE_CHALLENGE", payload: response.data });
            } catch (err) {
                console.log("Challenge was NOT deleted:", err.message);
            }
        }
    };

    console.log('Parent rendered again')
        return ( 
                <div className="flex-col hover:opacity-80">
                    <div className='flex place-content-between place-items-end '>
                        <div className=''>
                            <h1 className='font-bold text-lg text-red font-JockeyOne'>{challenge.title}</h1>
                            <h1 className='font-Inter text-xs text-createdByColor'>Created by <span className='font-bold'>{challenge.userName}</span></h1>
                        </div>
                        <div className='flex grayscale place-items-center'>
                        {/* {<h1 className='text-yellow hover:bg-yellow hover:text-black px-3 rounded-full bg-opacity-20 text-sm'>Leaderboard</h1>}       */}
                        {/* <span className='px-2 text-yellow font-semibold text-xs'><MdLeaderboard size={16}/></span> */}
                        </div>
                    </div>
                    <div className=' aspect-square 
                    w-full h-full pt-2'>
                    <div>                           
                <div className=' bg-white bg-opacity-25 rounded-xl overflow-hidden grayscale
                    h-40 
                    w-40 
                    lg:h-56
                    lg:w-56
                    xl:h-60
                    xl:w-60
                    2xl:h-72
                    2xl:w-72
                    '>
                    <ReactPlayer 
                    controls
                    className='react-player'
                        width='100%'
                        height='100%'
                        url={challenge.fileURL}
                    />
                </div>
          </div>        
            </div>
            {user.email === 'rcdemb@gmail.com'  || 'Amitay1599@gmail.com'? <span onClick={handleDelete} className="material-symbols-outlined">delete</span> : <></>}
           

        </div>
    )
}


export default Parents;





