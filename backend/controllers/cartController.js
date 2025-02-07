import userModel from "../models/userModel.js"


//add items to user cart
const addToCart = async (req, res)=>{
    try {
        let userData = await userModel.findOne({
            _id:req.body.userId
        })
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData})

        res.json({
            success: true,
            message:"Added to cart"
        })


    } catch (error) {
        res.json({
            success: false,
            message: "Error on Add to cart " + error
        })
    }
}


//remove items from user cart
const removeFromCart = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]){
            cartData[req.body.itemId] -=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({
            success: true,
            message:"Item Removed from cart"
        })

    } catch (error) {
        res.json({
            success: false,
            message: "Error on remove to cart " + error
        })
    }
}

//fetch user cart data
const getCartData = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({
            success: true,
            cartData
        })

    } catch (error) {
        res.json({
            success: false,
            message: "Error on get all cart data " + error
        })
    }
}

export {addToCart, removeFromCart, getCartData}