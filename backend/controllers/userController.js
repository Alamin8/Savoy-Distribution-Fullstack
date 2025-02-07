import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"Invalid user name or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                success:false,
                message:"Invalid user name or password"
            })
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            message: "User login Successful",
            token
        })

    } catch (error) {
        res.json({
            success:false,
            message: "Error on user login" +error
        })
    }
}


//Create token
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res)=>{
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({
                success: false,
                message:"User Already Exist"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message:"Please enter a valid email"
            })
        }

        if(password.length < 8){
            return res.json({
                success: false,
                message:"Password length minimum 8 digits"
            })
        }

        //hashong password
        const salt = await bcrypt.genSalt(10);
        const heshedPassword = await bcrypt.hash(password, salt)


        const newUser = new userModel({
            name:name,
            email:email,
            password:heshedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            success:true,
            message: "User Registration Successful",
            token
        })

    } catch (error) {
        res.json({
            success:false,
            message: "Error on user registration" +error
        })
    }
}

export {loginUser, registerUser}