import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import Blogtableitem from '../../components/admin/Blogtableitem'
import { useAPPContext } from '../../context/Appcontext'
import toast from 'react-hot-toast'


const Listblog = () => {
  const [blogs,setBlogs] = useState([])
  const {axios} = useAPPContext();
  
  const fetchBlogs = async()=>{
   try{
       const {data} = await axios.get('/api/admin/blogs')
    if(data.success){

      setBlogs(data.blogs);


    }else{
      toast.error(data.message)
    }
   }catch(error){
    toast.error(error.message)

   }
  }

  useEffect(()=>{
    fetchBlogs();
  },[])
  return (
    <div className='flex-1 pt-5 px-5 mt-4 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className='pb-3'>All Blogs</h1>
       <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>

            </thead>
            <tbody>
              {blogs.map((blog,index)=>{
                return <Blogtableitem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index ={index+1}/>
              })}
            </tbody>
          </table>
        </div>


    </div>
  )
}

export default Listblog