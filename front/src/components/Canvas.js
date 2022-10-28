import React from 'react'
import { useState, useEffect, useRef} from "react"
import badgeTemaplte from '../assets/badgeTemaplte.png'
import { VscCopy, VscCheck } from "react-icons/vsc";



const Canvas = ({challenge}) => {
    const [image, setImage] = useState()
    const [isCopy, setIsCopy] = useState(false)
    const [globalratio, setGlobalRatio] = useState (false)
    const canvas = useRef(null)


    const challengeID  = { 
      name: challenge.userName
    }
    
    useEffect(()=> { 
        const badge = new Image();
        badge.src = badgeTemaplte
        badge.onload = () => setImage(badge)
    }, [])

    
    useEffect(() => { 
      const createBadge = async () => { 
        if(image && canvas.current) { 
            const ctx =  canvas.current.getContext('2d')
            const x =  canvas.current.width / 2;
            const y =  canvas.current.height / 2;
            ctx.drawImage(image, 0, 0)      

            ctx.beginPath();
            ctx.arc(x, y, 45, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.font = ' 10px serif';
            ctx.fillStyle = 'white';
            ctx.textBaseline = 'middle';
            ctx.textAlign = "center"
            ctx.fillText(challengeID.name, x , y);
            
        } else { 
            console.log('ERROR')
        }
      }
      
      createBadge()
    }, [image, canvas, challengeID.name])



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
            width={100}
            height={100}
            />
            <div onClick={writeClipImg} className={isCopy ? 'grid place-items-center' : 'text-black  hover:text-yellow grid place-items-center '}>
            <span className='text-2xl '>{isCopy ?  <VscCheck className='text-yellow'/> : <VscCopy className='cursor-pointer'/>}</span>
            </div>
        </div>
    )
}


export default Canvas;