import productModel from "../models/productModel.js";
import fs from 'fs'


//add product
const addProduct = async (req, res)=>{
    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try{
        await product.save();
        res.json({
            success:true,
            message:"Product Added"
        })
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message: "Error on Product Added API"
        })
    }
}



// All Product List
const productList = async (req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({
            success:true,
            data:products
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message: "Error on All Product facing"
        })
    }
}

// Remove Product
const removeProduct = async ( req, res)=>{
    try {

        const product = await productModel.findById(req.body.id);
        if(product){
            fs.unlink(`uploads/${product.image}`, ()=>{}) //Also delete image from disk storage

            await productModel.findByIdAndDelete(req.body.id);
            res.json({
                success:true,
                message: "Product removed"
            })
        }else{
            res.json({
                success:false,
                message: "No product have on that ID"
            })
        }
        

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message: "Error on product delete"
        })
    }
}

export {addProduct, productList, removeProduct}