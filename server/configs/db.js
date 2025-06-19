import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();




const connectDB = async() =>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log("database Connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
    }catch(error){
        console.log(error.message)
    }
}



export default connectDB;