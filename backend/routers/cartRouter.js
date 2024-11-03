import express from 'express'
import { addToCart,removeFromCart,getCart, restoreCart } from '../controllers/cartController.js'
import authMiddleware from '../middlewares/auth.js'

const cartRouter=express.Router()

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.get("/get",authMiddleware,getCart)
cartRouter.post("/restore",authMiddleware,restoreCart)

export default cartRouter