import express from 'express'
import cors from "cors"
import connectDB from './config/db.js'
import tobaccoRouter from './routers/tobaccoRouter.js'
import ShishaRouter from './routers/shishaRouter.js'

import PartsRouter from './routers/partsRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: ["https://tl-alrabaa.vercel.app", "https://tl-alrabaa-frontend-5ef7f6dhk-ibrahim-hassouns-projects.vercel.app"], // Include both domains if necessary
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));


const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Connecting to the database
connectDB();

// API endpoints
app.get("/", (req, res) => {
    console.log("Server working");
    res.json({ success: true, message: "Received successfully" });
});
app.use("/api/tobacco", tobaccoRouter);
app.use("/api/shisha", ShishaRouter);
app.use("/api/parts", PartsRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
