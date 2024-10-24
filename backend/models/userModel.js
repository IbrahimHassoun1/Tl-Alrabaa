import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    address:{
        street:{
            type:String,
            required:false
        },
        city:{
            type:String,
            required:false
        },
        country:{
            type:String,
            required:false
        }
    },
    phone:{
        type:Number,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }
    
},{minimize:false})
export const userModel=mongoose.models.user||mongoose.model("user",userSchema)