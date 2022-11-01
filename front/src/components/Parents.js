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
    console.log(challenge)
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
                            <h1 className='font-Inter text-sm text-createdByColor'>Created by <span className='font-bold'>{challenge.userName}</span></h1>
                        </div>
                        <div className='flex grayscale place-items-center'>
                        {/* {<h1 className='text-yellow hover:bg-yellow hover:text-black px-3 rounded-full bg-opacity-20 text-sm'>Leaderboard</h1>}       */}
                        {/* <span className='px-2 text-yellow font-semibold text-xs'><MdLeaderboard size={16}/></span> */}
                        </div>
                    </div>
                    <div className=' aspect-square 
                    w-full h-full pt-2'>
                    <div>                           
                <div className=' bg-white 
                h-40 
                w-48 
                lg:h-56
                lg:w-56
                xl:h-60
                xl:w-60
                2xl:h-72
                2xl:w-72
                rounded-xl 
                overflow-hidden'>
                    <ReactPlayer 
                    className='object-cover'
                        width='100%'
                        height='100%'
                        url='https://www.youtube.com/watch?v=kCnNWyl9qSE&t=284s&ab_channel=KlasKarlsson'
                        // url={challenge.fileURL}
                        // url='https://www.youtube.com/watch?v=kCnNWyl9qSE&t=284s&ab_channel=KlasKarlsson'
                        // url='https://wlb-production.s3.us-west-1.amazonaws.com/92994ccce65c225c6afae4bab5c11f79084251c710158c0d40908b793d4a8ea6?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZX7BNS2XERDXY276%2F20221031%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221031T143202Z&X-Amz-Expires=18000&X-Amz-Signature=2a759e512a64af67455cb3706c320e3b7658b9334b9c0b26eb15acaa47f2a039&X-Amz-SignedHeaders=host&x-id=GetObject'
                    />
                </div>
          </div>        
                {/* <video 
                    // controls={hover ? true : false }
                    // onMouseEnter={(e) => 
                    //     {setHover(true)
                    //     e.target.play()
                    // }}
                    // onMouseLeave={(e) => {
                    //     setHover(false)
                    //     e.target.pause()
                    // }}
                    className='bg-green-900 object-cover rounded-xl aspect-video  h-full w-full '>
                    <source src={`${challenge.fileURL}`}  type="video/mp4" />
                </video> */}
            </div>
            {/* <span onClick={handleDelete} className="material-symbols-outlined">delete</span> */}

        </div>
    )
}


export default Parents;





