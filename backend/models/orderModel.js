import mongoose from "mongoose";


const orderShema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    items:{
        type: Array,
        required: true
    },
    amount:{
        type: Number,
        // required: true
        default: 1000
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        default: "Order Processing"
    },
    date:{
        type: Date,
        default: Date.now()
    },
    payment:{
        type: Boolean,
        required: false
    },
})

const orderModel = mongoose.models.order || mongoose.model("order", orderShema);

export default orderModel;