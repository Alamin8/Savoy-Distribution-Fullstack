
import mongoose from "mongoose";



  const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, // Product name
    description: { type: String, required: true }, // Product description
    price: { type: Number, required: true, min: 0 }, // Product price
    discountedPrice: { type: Number, min: 0 , default: 0}, // Discounted price (if any)
    category: { type: String, required: true }, // Product category (e.g., Electronics, Clothing)
    brand: { type: String, required: true }, // Product brand (e.g., Nike, Apple)
    image: { type: String, required: true }, // Array of image URLs
    stock: { type: Number, default: 0 }, // Total stock
    UPC: { type: Number, default: 0 }, 
    MOC: { type: String, default: '' }, 
    case_size: { type: String, default: '' },
    item_weight: { type: String, default: '' }, 
    package_weight: { type: String, default: '' }, 
    unit_count: { type: String, default: '' }, // Total stock
    isFeatured: { type: Boolean, default: false }, // Is the product featured?
    createdAt: { type: Date, default: Date.now }, // Product creation date
    updatedAt: { type: Date, default: Date.now }, // Product last update date
})


const productModel = mongoose.model.products || mongoose.model("products", productSchema)

export default productModel;