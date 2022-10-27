import React, { useState } from 'react'
import { useChallengesContext } from '../hooks/useChallengeContext'
import Badge from './Badge'

function Popup() {
    const {challenges} = useChallengesContext()
    const [sortedList, setSortedList] = useState([])
    const [parent, setparent] = useState(null)

    
    const shareToFacebook = () => { 

    }
    const shareToInsta = () => { 
        
    }
    const shareToTikTok = () => { 
        
    }

    // challenge={parent}



  return (
    <div className='grid place-items-center w-screen h-screen'>
        <div className='bg-stone-800 bg-opacity-50 p-8 grid place-items-center rounded-xl' >
            <h1 className='text-red font-JockeyOne pb-2 text-5xl font-bold'>Well done!</h1>
            <h1 className='text-red text-opacity-80 font-inter pb-6 text-md font-light'>Share your achivemnt</h1>
            <div className='flex items-center pb-8'>
            <h1 onClick={shareToFacebook} className='bg-yellow text-stone-800 font-medium px-2 mx-2 rounded-full w-24 text-center py-1'>(facebook)</h1>
            <h1 onClick={shareToInsta} className='bg-yellow text-stone-800 font-medium px-2 mx-2 rounded-full w-24 text-center py-1'>(Instagram)</h1>
            <h1 onClick={shareToTikTok} className='bg-yellow text-stone-800 font-medium px-2 mx-2 rounded-full w-24 text-center py-1'>(TikTok)</h1>
            </div>
            <div className=' bg-black px-12 py-4 rounded-xl'>
            <Badge />
            <div className='grid items-center gap-2 mt-6'>
            <span className='text-white px-2 bg-red'>(icon)<span className=''> USERNAME</span></span>
            <span className='text-white px-2 bg-red'>(icon)<span className=''> RECORD</span></span>

            </div>
            </div>

        </div>
    </div>
  )
}

export default Popup