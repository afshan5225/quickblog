import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/sidebar'
import { useAPPContext } from '../../context/Appcontext';



const Layout = () => {

    const{settoken,axios,navigate} = useAPPContext();

    
    function Logout(){
        localStorage.removeItem('token')
        axios.defaults.headers.common["Authorization"] = null;
        settoken(null)
        navigate("/")
    }

  return (
    <>
    <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img className="w-32 sm:2-40 cursor-pointer" src={assets.logo} onClick={()=>{
            navigate("/")

        }} />

        <button className='text-sm px-8 py-2 bg-purple-800 text-white rounded-full cursor-pointer' onClick={Logout}>Logout</button>
    </div>
        <div className='flex h-[calc(100vh-70px]'>
            <Sidebar />
            <Outlet />

        </div>
        </>
  )
}

export default Layout