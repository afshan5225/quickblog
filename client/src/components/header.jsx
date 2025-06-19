import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAPPContext } from '../context/Appcontext'



export const Header = () => {
    const {input,setInputs} = useAPPContext()
    const inputRef = useRef();
    const onSubmitHandler = async (e)=>{
      e.preventDefault();
      setInputs(inputRef.current.value)

    }

    const clear_search = ()=>{
      setInputs("")
      inputRef.current.value ="";
    }
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-purple-800 bg-purple-800/10 rounded-full text-sm text-purple-800'>
                <p>New: AI feature integrated</p>
                <img src={assets.star_icon}  className='w-2.5' srcset="" />
            </div>
            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'> Your own <span className='text-purple-800'>Blogging</span> <br />platform</h1>
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>Share your thoughts with the world through clean, elegant writing.  
  Blog effortlessly, connect deeply, and let your voice be heard.</p>
  <form onSubmit={onSubmitHandler} className='flex  justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
    <input ref={inputRef} type="text" placeholder='Search for blogs'  required className='w-full pl-4 outline-none'/>
    <button type='submit' className='bg-purple-800 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'> Search</button>
    
  </form>
            
        </div>
        <div className='text-center'>
          {input&& <button onClick={clear_search} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>}
        </div>
        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
    </div>
  )
}
