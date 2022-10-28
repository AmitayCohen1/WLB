import { useChallengesContext } from '../hooks/useChallengeContext'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';

import axios from "../config/axios";


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
                console.log("Challenge was NOT deleted:", err);
            }
        }
    };

    console.log('Parent rendered again')
    return (
        <div className="flex-col hover:opacity-80">
            <div className='flex place-content-between place-items-end '>
                <div className=''>
                    <h1 className='font-bold text-2xl text-red font-JockeyOne'>{challenge.title}</h1>
                    <h1 className='font-Inter text-sm text-createdByColor'>Created by <span className='font-bold'>{challenge.userName}</span></h1>
                </div>
                <div className='flex place-items-center'>
                    {/* {<h1 className='text-yellow hover:bg-yellow hover:text-black px-3 rounded-full bg-opacity-20 text-sm'>Leaderboard</h1>}       */}
                    {/* <span className='px-2 text-yellow font-semibold text-xs'><MdLeaderboard size={16}/></span> */}
                </div>
            </div>
            <div className=' aspect-square grayscale w-full h-full pt-2'>
                <video controls={hover ? true : false}
                    onMouseEnter={(e) => {
                        setHover(true)
                        e.target.play()
                       }}
                        onMouseLeave={(e) => {
                            setHover(false)
                            e.target.pause()
                        }}
                        className='bg-green-900 object-cover rounded-xl aspect-video  h-full w-full '>
                        <source src={challenge.fileURL} type='video/mp4'/>
                </video>
             </div>
             {/* <span onClick={handleDelete} className="material-symbols-outlined">delete</span> */}
    )
}



export default Parents;





