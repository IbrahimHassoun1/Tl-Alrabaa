import express from "express";
import bcrypt from 'bcryptjs';
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from 'validator';

// Login
export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error during login" });
    }
};
export const getUserId=async(req,res)=>{
    const {token}=req.headers;
    try{
        const userId=jwt.verify(token,process.env.JWT_SECRET)
        res.json({success:true,userId})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"couldn't find id"})
    }
}
// Token Creation
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Signup
export const signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName, address, phone } = req.body;

        // Ensure that the email field exists
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if the email is already in use
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Incorrect email format" });
        }

        // Validate password length
        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: "Password is too short, it should be longer than 8 characters" });
        }

        // Hash the password (ensure you await bcrypt.hash)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // <-- Add await here

        // Create new user
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            address,
            phone
        });

        await newUser.save();
        const token = createToken(newUser._id);
        res.status(201).json({ success: true, token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error during signup" });
    }
};

export const getInfo = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            console.log("userId not inserted");
            return res.json({ success: false, message: "userId not inserted" });
        }
        
        const newUser = await userModel.findById(userId);
        if (!newUser) {
            console.log("No user with this Id");
            return res.json({ success: false, message: "No user with this Id" });
        }
        
        const data = {
            name:`${newUser.firstName} ${newUser.lastName}`,
            email:newUser.email,
            phone:newUser.phone

        }
        
        return res.json({ success: true, data });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
};

