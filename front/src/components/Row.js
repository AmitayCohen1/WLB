import React, { useRef, useState } from 'react';

import html2canvas from 'html2canvas';
import Title from '../assets/Title.svg'
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineCheck } from "react-icons/hi";





const Row = ({challenge,index, parent}) => {
    const badgeRef = useRef()
    const [isCopy, setIsCopy] = useState(null)
    const [hover, setHover] = useState()

    const captureElement = async (element) => {   
      setIsCopy(true)     
        const canvas = await html2canvas(element,  {  
          scale: 15,
            allowTaint: true
        });
        console.log(canvas)
        const url = await canvas.toDataURL()
        console.log(url)
            try {
          const data = await fetch(url);
          const blob = await data.blob();
          await navigator.clipboard.write([
            new window.ClipboardItem({
              [blob.type]: blob
              
            })
          ]);
          console.log('Fetched image copied.');

          } catch (err) {
          console.error(err.name, err.message, 'ERROROROROROOR');
        }
}



  return (
    <div className=' 
        grid grid-cols-12
      text-black sm:text-base outline-stone-800 bg-white
        rounded-lg
        mx-4
        sm:mx-10
        md:mx-12
        lg:mx-28
        xl:mx-64'>

        {/* Record */}
        <video 
        controls={hover ? true : false }
        onMouseEnter={(e) => 
        {setHover(true)
        e.target.play()
        }}
        onMouseLeave={(e) => {
        setHover(false)
        e.target.pause()
        }}
        className='col-span-3 spect-square w-28 md:w-36 object-cover rounded-l-lg h-36 grayscale'>
          <source 
          src={challenge.fileURL} 
          type="video/mp4"
          />
        </video>


        

        <div className='col-span-2 xl:col-span-2 px-2 self-center
        sm:text-base
        md:text-base
        lg:text-lg
        break-after-auto
        xl:text-xl'>{challenge.userName} Cohen
        </div>

        {/* Rank */}
        <div className='col-span-1 xl:col-span-1 pr-2 self-center
        sm:text-base
        md:text-base
        lg:text-lg
        xl:text-xl
        '>{index + 1 }</div>

        {/* Score */}
        <div className='text-yellow bg-yellow bg-opacity-20 border-yellow border px-2 w-fit rounded-full ml-2 self-center
        col-span-2 
        md:col-span-2
        xl:col-span-2
        2xl:col-span-2
        sm:text-base
        md:text-base
        lg:text-lg
        xl:text-xl
        '>{challenge.reps}</div>



        {/* Badge & Copy*/}
        <div className='col-span-3 grid place-items-center'>
          <div ref={badgeRef} className='
           content-center bg-badgeBG  rounded-full  
          aspect-square grid place-items-center 
          relative h-[100px] self-center'>      

            <img src={Title} alt='The world Leaderboard' className='absolute top-1'/>
            <div className='text-yellow text-[5px] text-center float-left font-Roman absolute right-[6px] pb-4'>{parent.createdAt.split('-')[0] + ' '}</div>
            <div className='text-yellow text-[5px] text-center float-right font-Roman font-thin absolute left-[6px] pb-4 '>
              {parent.createdAt.split('-')[1] + '.' + parent.createdAt.split('T' && ':')[1]}</div>
              <div className='text-[40px] text-red font-RedBadge'>{challenge.reps}<span className='text-[4px] font-serif absolute top-8 align-middle right-5 sm:top-5'>nd</span></div>
              <div className='text-white text-[7px] font-Badge text-center absolute leading-tight px-2 pt-2'>{challenge.userName}</div>  
              <div className='text-yellow text-[7px] text-center px-2 font-Roman capitalize absolute bottom-4 sm:bottom-3'>{parent.title}</div>
            </div>
        </div>

        {/* Copy Icon */}
              <div className='col-span-1 grid place-items-center float-left relative'>
                <div className={isCopy? 'bg-yellow bg-opacity-10 stroke-black p-2 rounded-full text-yellow absolute left-0' : ' bg-red bg-opacity-10 stroke-black p-2 rounded-full text-red cursor-pointer hover:text-yellow hover:bg-yellow hover:bg-opacity-10 absolute left-0'}>
                <div className={isCopy ? '' : ' '} onClick={() => captureElement(badgeRef.current)}>{isCopy ? <HiOutlineCheck /> : <IoCopyOutline />}</div>
              </div>
            </div>

        </div>
  )
}

export default Row