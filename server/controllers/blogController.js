import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Blog from "../modals/blog.js";
import comment from "../modals/comment.js";
import Main from "../configs/genai.js";


export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const image = req.file;

    if (!title || !subTitle || !description || !category || !isPublished || !image) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // ✅ Read the file from multer using Buffer
    const fileBuffer = fs.readFileSync(image.path);

    // ✅ Upload buffer to imagekit
    const response = await imagekit.upload({
      file: fileBuffer, // IMPORTANT: Must be a buffer
      fileName: image.originalname,
      folder: "blogs"
    });

    // ✅ Now create optimized URL
    const optimizedImageURL = imagekit.url({
      path: response.filePath, // 🔥 Corrected!
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" }
      ]
    });

    // ✅ Save to MongoDB
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageURL,
      isPublished
    });

    res.json({ success: true, message: "Blog created!" });
  } catch (error) {
    console.error("Error in addBlog:", error);
    res.json({ success: false, message: error.message });
  }
};

const getALLblogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getBlogbyID = async (req, res) => {
    try {
        const { blogid } = req.params;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const DltBlogbyID = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.json({ success: true, message: 'Blog is deleted!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({ success: true, message: 'Blog status updated!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const Addcomment = async(req,res)=>{

        
    try{ 
      const{blog,name,content} =req.body;

      await comment.create({blog,name,content});
      res.json({success:true,message:'Comment added for review'})

    }catch(error){

      res.json({success:false,message:error.message})



    }

  
}


 const getBlogComments = async (req,res)=>{
      try{
        const {blogid} = req.body;
        const comments = await comment.find({blog:blogid,isApproved:true}).sort({createdAt:-1});
         res.json({success:true,comments})

      }catch(error){
         res.json({success:false,message:error.message})

      }
    }

    export const generateContent = async(req,res)=>{
      try{
          const {prompt} = req.body;
          const content = await Main(prompt + 'Generate a blog content for this topic in simple text format')
          res.json({success:true,content})

      }catch(error){
        res.json({success:false,message:error.message})

      }
    }



export {
    getALLblogs,
    getBlogbyID,
    DltBlogbyID,
    togglePublish,
    Addcomment,
    getBlogComments,
};
