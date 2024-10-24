import express from "express";
import multer from 'multer'
import {listShisha,addShisha,removeShisha, updateShisha,findOne} from "../controllers/shishaController.js"


const ShishaRouter=express.Router()

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`Shisha${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})




ShishaRouter.post("/add",upload.single("image"),addShisha)
ShishaRouter.get("/list",listShisha)
ShishaRouter.delete("/delete",removeShisha)
ShishaRouter.patch("/patch",upload.single("image"),updateShisha)

ShishaRouter.get("/:id", findOne);
export default ShishaRouter
