
import React from 'react'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAPPContext } from '../../context/Appcontext';


const commentTableItem = ({comment,fetchComments}) => {
    const {blog,createdAt,_id} = comment;
    const BlogDate = new Date(createdAt);

    const {axios} = useAPPContext();
    const ApproveComments = async()=>{
        try{
            const {data} = await axios.post("/api/admin/approve-comment",{id:_id}) 
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)

        }
    }


    const deletecomment = async()=>{
        try{
            const confirm = window.confirm("Are you sure to delete this comment?")
            if(!confirm) return;
            const {data} = await axios.post("/api/admin/delete-comment",{id:_id}) 
            if(data.success){
                toast.success(data.message)
                fetchComments()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)

        }
    }

  return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>
                    Blog
                </b>:{blog.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>
                    Name
                </b>:{comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b>:{comment.content}

            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toLocaleDateString()}
            </td>
            <td className='px-6 py-4 max-sm:hidden' >
                <div className='flex gap-2'>
                    {!comment.isApproved?
                    <img onClick={ApproveComments} src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' />:<p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p> }
                    <img onClick={deletecomment} src={assets.bin_icon} className= 'w-5 hover:scale-110 transition-all cursor-pointer' alt="" srcset="" />
                </div>
            </td>
        </tr>
  )
}

export default commentTableItem