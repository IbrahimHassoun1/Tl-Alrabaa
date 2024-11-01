import express from 'express'
import { addOrder,removeOrder,changeOrderStatus, listOrder } from '../controllers/orderController.js'


const orderRouter=express.Router()


orderRouter.get("/list",listOrder)
orderRouter.post("/add",addOrder)
orderRouter.post("/remove",removeOrder)
orderRouter.patch("/edit",changeOrderStatus)



export default orderRouter