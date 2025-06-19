import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";

import { div } from "motion/react-client";
import { assets, blog_data, comments_data } from "../assets/assets";
import moment from "moment/moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAPPContext } from "../context/Appcontext";
import toast from "react-hot-toast";







function Blog() {

  const {axios} = useAPPContext();
  const { id } = useParams();
  const [data, setdata] = useState(null);
  const [comment,setcomment] = useState([])
   const [name, setname] = useState('');
  const [content,setcontent] = useState('')

  const addcomment = async(e)=>{
    e.preventDefault();

    try{
        const { data } = await axios.post("/api/blog/add-comment", { blog: id,name,content });
    if(data.success){
      toast.success(data.message)
      setname("")
      setcontent("")
    }else{
      toast.error(data.message)
    }
    }catch(error){
        toast.error(error.message)


    }
   

  }

  const fetchblogdata = async () => {
    try{
      const {data} = await axios.get(`/api/blog/${id}`)
       data.success?setdata(data.blog):toast.error(data.message)

    }catch(error){

      toast.error(error.message)

    }
  };

  const fetchcomments = async () => {
  try {
    const { data } = await axios.post("/api/blog/comments", { blogid: id });
    data.success ? setcomment(data.comments) : toast.error(data.message); // ✅ correct
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(() => {
    fetchblogdata();
    fetchcomments()
  }, []);

  return data ? (
    <div>
       
        <div className="relative">
            <img src={assets.gradientBackground} className="absolute -top-50 -z-1 opacity-50" />
             <Navbar />
             <div className="text-center mt-20 text-gray-600">
                <p className="text-purple-800 py-4 font-medium">Published on {moment(data.createdAt).format('MMMM Do YYYY')}</p>
                <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">{data.title}</h1>
                <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
                <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-purple-800/35 bg-purple-800/5 font font-medium text-purple-800">Micheal Brown</p>
             </div>
             <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
                <img src={data.image} alt="" className="rounded-3xl mb-5" />
                <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{__html:data.description}}></div>
                <div className="mt-14 mb-10 max-w-3xl mx-auto"> </div>
                <p>Comments {comment.length}</p>
                <div className='flex flex-col  gap-4'>
                  {comment.map((item,index)=>(
                    <div key={index} className="relative bg-purple-800/2 border border-purple-800/5  max-w-xl p-4 rounded text-gray-600">
                        <div>
                            <img src={assets.user_icon} className="w-6" />
                            <p className="font-medium">{item.name}</p>
                        </div>
                        <p className="text-sm max-w-md ml-8">{item.content}</p>
                        <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">{moment(item.createdAt).fromNow()}</div>
                    </div>
                  ))}
                </div>
             </div>
             <div className="max-w-3xl mx-auto">
                <p className="font-semibold mb-4">Add your comment</p>
                <form onSubmit={addcomment} className="flex flex-col items-start gap-4 max-w-lg">
                    <input onChange={(e)=>setname(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full p-2 border border-gray-300 rounded outline-none" />
                    <textarea   onChange={(e)=>setcontent(e.target.value)} value={content}  placeholder="comment" className="w-full p-2 border border-gray-300 rounded outline-none h-48" required></textarea>
                    <button type="submit" className="bg-purple-800 text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer">submit</button>

                </form>

             </div>
             <div className="my-24 max-w-3xl mx-auto">
                <p className="font-semibold my-4">Share this article on social media</p>
                <div className="flex">
                    <img src={assets.facebook_icon} width={50} />
                    <img src={assets.twitter_icon} width={50} />
                    <img src={assets.googleplus_icon} width={50} />
                </div>
             </div>
        </div>
        <Footer/>
    </div>
    
  ): <Loader />
}

export default Blog;

