import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Tl-Alrabaa:Tl-Alrabaa%401962@tl-alrabaa.ebxny.mongodb.net/?retryWrites=true&w=majority&appName=Tl-Alrabaa");
        console.log("DB connected successfully");
    } catch (error) {
        console.error("Connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
