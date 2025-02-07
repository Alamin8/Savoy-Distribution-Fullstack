import express from 'express'
import { addProduct, adminSearchProduct, productList, removeProduct, searchProduct, singleProduct } from '../controllers/productController.js'
import multer from 'multer'


const productRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})


productRouter.post("/add", upload.single("image"), addProduct)
productRouter.get("/list", productList)
productRouter.post("/remove", removeProduct)
productRouter.get("/list/:id", singleProduct)
productRouter.get("/search", searchProduct)
productRouter.get("/adminSearch", adminSearchProduct)



export default productRouter;
