import express from "express";
import multer from 'multer'
import {listTobacco,addTobacco,removeTobacco, updateTobacco,findOne} from "../controllers/tobaccoController.js"


const tobaccoRouter=express.Router()

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`Tobacco${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})




tobaccoRouter.post("/add",upload.single("image"),addTobacco)
tobaccoRouter.get("/list",listTobacco)
tobaccoRouter.delete("/delete",removeTobacco)
tobaccoRouter.patch("/patch",upload.single("image"),updateTobacco)


tobaccoRouter.get("/:id", findOne);

export default tobaccoRouter
