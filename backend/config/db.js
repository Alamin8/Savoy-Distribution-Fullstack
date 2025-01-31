import mongoose from "mongoose"


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://mdalaminmirdha1211:6BbG8ekY2CEkg8dT@cluster0.ptq6n.mongodb.net/savoy-distribution').then(()=>console.log("DB Connected"))
}