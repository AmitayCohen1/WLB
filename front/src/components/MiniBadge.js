import React from 'react'

const MiniBadge = () => { 
  return (
 
    <div className='w-48 h-48 rounded-full bg-white grid place-items-center'>
      <h1 className=' bg-green-200 mb-2'>title</h1>
      <div className='flex bg-green-500 w-full justify-between px-2'>
        <h1 className=' text-xs bg-green-200 px-2'>0.6/0.6</h1>
        <h1 className=' text-xs bg-green-200 px-2'>2022</h1>
      </div>
      <h1 className=' text-7xl bg-green-200 inline-block mb-2 absolute'>1<span className='text-sm'>st</span></h1>
      <h1 className=' text-xs bg-green-200 inline-block mb-2'>Left-handed Fencing</h1>
    </div>

  )
}

export default MiniBadge
