import React from 'react'
import { useState, useEffect, useRef} from "react"
// import badgeTemaplte from '../assets/badgeTemaplte.png'
import { VscCopy, VscCheck } from "react-icons/vsc";
import badgeImage from '../assets/badge1.png'



const Badge = () => {
    const [image, setImage] = useState()
    const [isCopy, setIsCopy] = useState(false)
    const canvas = useRef(null)


    useEffect(()=> { 
        const badge = new Image();
        badge.src = badgeImage
        badge.onload = () => setImage(badge)
    }, [])

    
    useEffect(() => { 
      const createBadge = async () => { 
        if(image && canvas.current) { 
            const ctx =  canvas.current.getContext('2d')
            // canvas.current.width =  badgeImage.width
            // canvas.current.height = badgeImage.height
            console.log(canvas.current.width)
            console.log(devicePixelRatio)


            // ctx.scale(2,2)
            const x =  canvas.current.width / 2;
            const y =  canvas.current.height / 2;
            ctx.drawImage(image, 0, 0)            
            ctx.beginPath();
            ctx.arc(x, y, 45, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = '10px serif';
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'middle'; 
            ctx.textAlign = "center"
            ctx.fillText('challengeID', x , y);

        } else { 
            console.log('ERROR')
        }
      }
      
      createBadge()
    }, [image, canvas])



     const writeClipImg = async () => {
            const url = await canvas.current.toDataURL()
        try {
          const data = await fetch(url);
          const blob = await data.blob();
          await navigator.clipboard.write([
            new window.ClipboardItem({
                [blob.type]: blob
            })
          ]);
          console.log('Fetched image copied.');
          setIsCopy(true)
          console.log(window.devicePixelRatio);
        } catch (err) {
          console.error(err.name, err.message);
        }
      }
      


    return( 
        <div className='flex place-items-center justify-items-start self-start gap-2'>

            <canvas 
            id='canvas'
            ref={canvas}
            width={500}
            height={500}
            />
            <div onClick={writeClipImg} className={isCopy ? 'grid place-items-center' : 'text-black  hover:text-yellow grid place-items-center '}>
            <span className='text-2xl '>{isCopy ?  <VscCheck className='text-yellow'/> : <VscCopy className='cursor-pointer'/>}</span>
            </div>
        </div>
    )
}


export default Badge;