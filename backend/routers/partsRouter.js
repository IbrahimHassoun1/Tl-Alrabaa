import express from "express";
import multer from 'multer'
import {listParts,addParts,removeParts, updateParts,findOne} from "../controllers/partsController.js"


const PartsRouter=express.Router()

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`Parts${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})




PartsRouter.post("/add",upload.single("image"),addParts)
PartsRouter.get("/list",listParts)
PartsRouter.delete("/delete",removeParts)
PartsRouter.patch("/patch",upload.single("image"),updateParts)

PartsRouter.get("/:id", findOne);

export default PartsRouter
