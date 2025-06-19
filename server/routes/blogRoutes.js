import express from "express";
import { addBlog, Addcomment, DltBlogbyID, generateContent, getALLblogs, getBlogbyID, getBlogComments, togglePublish } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";


const blogRouter = express.Router();

blogRouter.post("/add",upload.single('image'),auth,addBlog)
blogRouter.get("/all",getALLblogs);
blogRouter.get("/:blogid",getBlogbyID);
blogRouter.post("/delete",auth,DltBlogbyID);
blogRouter.post("/toggle-publish",auth,togglePublish)
blogRouter.post("/add-comment",Addcomment)
blogRouter.post("/comments",getBlogComments)
blogRouter.post('/generate',auth,generateContent)



export default blogRouter;