import productModel from "../models/productModel.js";
import fs from "fs";



//add product
const addProduct = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discountedPrice: req.body.discountedPrice,
    category: req.body.category,
    brand: req.body.brand,
    image: image_filename,
    variants: req.body.variants,
    reviews: req.body.reviews,
    stock: req.body.stock,
    UPC: req.body.UPC,
    MOC: req.body.MOC,
    case_size: req.body.case_size,
    item_weight: req.body.item_weight,
    package_weight: req.body.package_weight,
    unit_count: req.body.unit_count,
  });
  try {
    await product.save();
    res.json({
      success: true,
      message: "Product Successfully Added",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error on Product Added API",
    });
  }
};



// All Product List
const productList = async (req, res) => {
  try {

    const { category, brand, minPrice, maxPrice, sortBy, pageItemLimit } = req.query;
    const query = {};
  
    const limit = parseInt(pageItemLimit) || 15;
    console.log(pageItemLimit)
    if (category) query.category = category;
    if (brand) query.brand = brand;
    console.log(brand)
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
  
    const sortOptions = {};
    if (sortBy === 'price') sortOptions.price = 1;
    if (sortBy === 'rating') sortOptions.averageRating = -1;


    const products = await productModel.find(query).limit(limit).sort(sortOptions);

    if(!products){
      res.json({
        success: false,
        message: "No Product in database"
      })
    }
    res.json({
      success: true,
      result: products.length,
      data: products
      
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error on All Product facing",
    });
  }
};




//Search Product
const searchProduct = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;


  const { q } = req.query;
  try {
    const products = await productModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    }).skip(skip).limit(limit);
    const totalProducts = await productModel.countDocuments();
    res.json({
      success: true,
      result: products.length,
      data: products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Error or product searching" + error
    })
  }
};



//admin search product
const adminSearchProduct = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;


  const { q } = req.query;
  try {
    const products = await productModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ],
    }).skip(skip).limit(limit);
    const totalProducts = await productModel.countDocuments();
    res.json({
      success: true,
      result: products.length,
      data: products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Error or product searching" + error
    })
  }
};


//Get Single Product
const singleProduct = async (req, res) => {
  try {

    const product = await productModel.findById(req.params.id);
    
    if (!product) {
      res.json({
        success: false,
        message: "This product not found" +error,
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error on All Product facing" + error,
    });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (product) {
      fs.unlink(`uploads/${product.image}`, () => {}); //Also delete image from disk storage

      await productModel.findByIdAndDelete(req.body.id);
      res.json({
        success: true,
        message: "Product removed",
      });
    } else {
      res.json({
        success: false,
        message: "No product have on that ID",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error on product delete",
    });
  }
};

export { addProduct, productList, removeProduct, singleProduct, searchProduct, adminSearchProduct };
