import React, { useState } from 'react'
import { useAPPContext } from '../../context/Appcontext';

const login = () => {

  const {axios,settoken} = useAPPContext();

  const handleSubmit  = async (e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/admin/login',{email,password})

      if(data.success){
        settoken(data.token)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      }else{
         toast.error(error.message)
      }
    }catch(error){
        toast.error(error.message)
    }
    
  }

   const [email,setemail] =useState('');
    const [password,setPassword] = useState('');
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-purple-800/30 shadow-xl shadow-purple-800/15 rounded-lg'>
        <div className='flex flex-col items-center justify center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-purple-800'>Admin</span> Login</h1>
            <p className='font-light'>Enter your Credentials to  access the admin panel</p>
          </div>
          <form  onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input type="email" onChange={e=>setemail(e.target.value)} value={email} required placeholder='your email id'
              className=' border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div >
             <div className='flex flex-col'>
              <label>Password</label>
              <input type="password"  onChange={e=>setPassword(e.target.value)} value={password} required placeholder='Enter password'
              className=' border-b-2 border-gray-300 p-2 outline-none mb-6'/>
            </div>
            <button type='submit' className='w-full py-3 font-medium bg-purple-800 text-white rounded cursor-pointer hover:bg-purple-800/90 transition-all'>Login</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default login