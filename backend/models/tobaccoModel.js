import mongoose from "mongoose";

const tobaccoSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:false,
        default:3
    },
    image:{
        type:String,
        required:true
    },
    flavor:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    collectionName:{
        type:String,
        required:true
    }
})
const tobaccoModel=mongoose.models.tobacco||mongoose.model("tobacco",tobaccoSchema)


export default tobaccoModel