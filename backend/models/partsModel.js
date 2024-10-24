import mongoose from "mongoose";

const partsSchema=mongoose.Schema({
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
        required:false
    },
    type:{
        type:String,
        required:true
    },
    collectionName:{
        type:String,
        required:true
    }
    
})
const partsModel=mongoose.models.parts||mongoose.model("parts",partsSchema)


export default partsModel