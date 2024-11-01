import mongoose from 'mongoose'

const orderSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        required:true
    },
    currentStatus:{
        type:String,
        required:true,
        enum: ["pending", "completed", "canceled"] 
    }

},{minimize:false})

export const orderModel=mongoose.models.order||mongoose.model("order",orderSchema)

