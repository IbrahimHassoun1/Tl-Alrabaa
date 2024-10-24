import mongoose from "mongoose";

const shishaSchema=mongoose.Schema({
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
        required:false
    },
    image:{
        type:String,
        required:true
    },
    color:{
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
const shishaModel=mongoose.models.shisha||mongoose.model("shisha",shishaSchema)


export default shishaModel