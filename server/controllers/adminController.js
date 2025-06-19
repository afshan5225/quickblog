import jwt from "jsonwebtoken"
import blog from "../modals/blog.js"
import comment from "../modals/comment.js"

export const adminLogin = async(req,res)=>{
    try{

        const {email,password} = req.body

        if(email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD){
            return res.json({success: false, message:"Invalid Credentials"})
        }

        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json({success:true,token})

    }catch(error){

        res.json({success:false,message:error.message})

    }
}


export const getAllBlogsAdmin = async(req,res)=>{
    try{
        const blogs = await blog.find({}).sort({createdAt:-1});
        res.json({success:true,blogs})

    }catch(error){
        res.json({success:false,message:error.message});
    }
}


export const getAllCommentsAdmin = async(req,res)=>{
    try{
        const comments = await comment.find({}).populate('blog').sort({createdAt:-1})
        res.json({success:true,comments})
    }catch(error){
        res.json({success:false,message:error.message})

    }
}

export const getDashboard = async(req,res)=>{
    try{
        const recentBlogs = await blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = await blog.countDocuments();
        const comments = await comment.countDocuments();
        const drafts = await blog.countDocuments({isPublished:false});

        const dashboardData  = {
            blogs,comments,drafts,recentBlogs
        }
        res.json({success:true,dashboardData });

    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const deleteCommentbyId = async(req,res)=>{
    try{
    const {id} = req.body;
    await comment.findByIdAndDelete(id);

    await comment.deleteMany({blog:id})
    res.json({success:true, message:"comment has been deleted"})
    }catch(error){
         res.json({success:false,message:error.message});
    }
}


export const approveCommentbyId = async(req,res)=>{
    try{
        const {id} = req.body;
        await comment.findByIdAndUpdate(id,{isApproved:true})
        res.json({success:true, message:"comment has been approved"})
    }catch(error){
        res.json({success:false,message:error.message});
    }
}





