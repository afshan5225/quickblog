import express from "express";

import dotenv from "dotenv"
import cors from 'cors';
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
await connectDB();

app.use(cors());
app.use(express.json())


//Routes
app.get('/',(req,res)=>{res.send("Apis is working")})


app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

app.listen(3000, () => {
  console.log(`✅ Server is running on port http://localhost:${PORT}` );
});


export default app;