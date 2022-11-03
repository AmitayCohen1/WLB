import React, { useRef, useState } from 'react';

import html2canvas from 'html2canvas';
import Title from '../assets/Title.svg'
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineCheck } from "react-icons/hi";
import ReactPlayer from 'react-player';
import copy from 'copy-to-clipboard';






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

        //   const clipboardItem = new ClipboardItem({
        //     'text/plain': func().then((result) => {

        //     if (!result) {
        //         return new Promise(async (resolve) => {
        //             resolve(new Blob[``]())
        //         })
        //     }
        
        //     const copyText = `some string`
        //         return new Promise(async (resolve) => {
        //             resolve(new Blob([copyText]))
        //         })
        //     }),
        // })
        // // Now, we can write to the clipboard in Safari
        // navigator.clipboard.write([clipboardItem])
          // copy(blob, { })
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
        xl:mx-64
        overflow-hidden
        '>

        {/* Record */}
        <div
         className='col-span-3 md:w-36 w-11/12 grayscale overflow-hidden'>
        <ReactPlayer 
            controls
            className='react-player'
            width='100%'
            height='100%' 
            url='https://www.youtube.com/watch?v=kCnNWyl9qSE&t=284s&ab_channel=KlasKarlsson'
            // url={challenge.fileURL}
          />
          </div>
        <div className='col-span-2 xl:col-span-2  self-center ml-2 
        text-xs
        md:text-base
        lg:text-lg
        break-after-auto
        xl:text-xl'>{challenge.userName}
        </div>

        {/* Rank */}
        <div className='col-span-1 xl:col-span-1 pr-2 self-center ml-2 
         text-xs
        md:text-base
        lg:text-lg
        xl:text-xl
        '>{index + 1 }</div>

        {/* Score */}
        <div className='text-yellow bg-yellow bg-opacity-20 border-yellow border px-2 w-fit rounded-full ml-2 self-center
        col-span-2
        text-xs
        xl:col-span-2
        2xl:col-span-2
        sm:text-base
        md:text-base
        lg:text-lg
        xl:text-xl
        '>{challenge.reps}</div>



        {/* Badge & Copy*/}
        <div className='col-span-3 grid place-items-center relative ml-4 pb-8 pt-2 md:py-4'>
          <div ref={badgeRef} className='
           content-center bg-badgeBG  rounded-full  
          aspect-square grid place-items-center 
          relative self-center
          h-[80px]
          md:h-[100px]
          lg:h-[120px]'>      

            <img src={Title} alt='The world Leaderboard' className='absolute top-1'/>

            <div className='text-yellow text-[5px] text-center float-left font-Roman absolute right-[6px] pb-4'>{parent.createdAt.split('-')[0] + ' '}</div>

            <div className='text-yellow text-[5px] text-center float-right font-Roman font-thin absolute left-[6px] pb-4 '>

              {parent.createdAt.split('-')[1] + '.' + parent.createdAt.split('T' && ':')[1]}</div>

              <div className='text-red font-RedBadge
              text-5xl
              lg:text-6xl'>{index + 1}<span className=' font-serif absolute align-middle 
              text-[4px] 
              md:text-[6px]
              lg:text-[8px]
              top-5 right-6
              md:top-6 md:right-7
              lg:top-7 lg:right-9
              xl:top-7
              '>nd</span></div>
              <div className='text-white font-Badge text-center px-2 absolute pt-3 leading-tight
              text-[6px]  
              md:text-[7px]
              lg:text-[9px] 
              xl:text-[8px] '>{challenge.userName}</div>  

              <div className='text-yellow text-center px-2 font-Roman capitalize absolute
              bottom-3 
              sm:bottom-1
              md:bottom-3
              lg:bottom-4
              text-[5px] 
              md:text-[7px]  
              lg:text-[9px]  

              '>{parent.title}</div>


              <div className='absolute -bottom-6 md:bottom-auto flex gap-1 md:-right-10 md:top-auto md:flex-col  text-red hover:text-yellow hover:cursor-pointer' onClick={() => captureElement(badgeRef.current)}>
                  <div className={isCopy ? ' grid place-content-center text-yellow' : 'grid place-content-center'} >{isCopy ? <HiOutlineCheck size={12} /> : <IoCopyOutline size={12} />}</div>
  
                <span className={isCopy? 'text-xs text-center self-center text-yellow' : 'text-xs text-center self-center'}>{isCopy ? 'copied' : 'copy'}</span>
                </div>

              </div>


        </div>

        {/* Copy Icon */}


        </div>
  )
}

export default Row