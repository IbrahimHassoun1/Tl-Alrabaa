import express from 'express'
import cors from "cors"
import connectDB from './config/db.js'
import tobaccoRouter from './routers/tobaccoRouter.js'
import ShishaRouter from './routers/shishaRouter.js'
import PartsRouter from './routers/partsRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv';
dotenv.config();

const app=express()
app.use(cors({
    origin: "https://tl-alrabaa.vercel.app", // Update this with your actual frontend URL
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));



const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json())
app.use(cors())
//connecting to DB atlas
connectDB()
//api endpoints
app.get("/",(req,res)=>{
    console.log("server working")
    res.json({success:true,message:"received successfuly"})
})
app.use("/api/tobacco",tobaccoRouter)
app.use("/api/shisha",ShishaRouter)
app.use("/api/parts",PartsRouter)
app.use("/api/user",userRouter)
app.use("/images",express.static("uploads"))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
