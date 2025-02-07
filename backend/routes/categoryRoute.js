import express from 'express'
import multer from 'multer'

import {addCategory, categoryList, removeCategory, searchCategory, singleCategory} from '../controllers/categoryController.js'


const categoryRouter= express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

categoryRouter.post("/add", upload.single("image"), addCategory)
categoryRouter.get("/list", categoryList)
categoryRouter.get("/search", searchCategory)
categoryRouter.get("/list/:id", singleCategory)
categoryRouter.post("/remove", removeCategory)



export default categoryRouter;


