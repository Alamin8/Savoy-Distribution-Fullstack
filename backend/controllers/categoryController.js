import categoryModel from "../models/categoryModel.js";
import fs from "fs";

//add category
const addCategory = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const { name, description } = req.body;
  const existCategory = await categoryModel.findOne({name});

  if (existCategory) {
    return res.json({
      success: false,
      message: "Category already exist",
    });
  }

  const category = new categoryModel({
    name: name,
    description: description,
    image: image_filename,
  });
  try {
    await category.save();
    res.json({
      success: true,
      message: "Category Successfully Added",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error on Category Added API" + error,
    });
  }
};

const categoryList = async (req, res) => {
  try {
    const category = await categoryModel.find();

    if (!category) {
      return res.json({
        success: false,
        message: "No category in database",
      });
    }
    res.json({
      success: true,
      result: category.length,
      data: category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error on Category List" + error,
    });
  }
};

const searchCategory = async (req, res) => {
  try {
    const { q } = req.query;
    const category = await categoryModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    if(!category){
        return res.json({
            success: false,
            message:"No Category Found"
        })
    }

    res.json({
        success:true,
        result: category.length,
        data: category
    })

  } catch (error) {
    res.json({
        status: false,
        message:"Error on category search" + error
    })
  }
};


//Get Single Product
const singleCategory = async (req, res) => {
    try {
  
      const category = await categoryModel.findById(req.params.id);
      
      if (!category) {
       return res.json({
          success: false,
          message: "This Category not found" +error,
        });
      }
  
      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Error on Category facing" + error,
      });
    }
  };


  // Remove Category
const removeCategory = async (req, res) => {
    try {
      const category = await categoryModel.findById(req.body.id);
      if (category) {
        fs.unlink(`uploads/${category.image}`, () => {}); //Also delete image from disk storage
  
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({
          success: true,
          message: "Category removed",
        });
      } else {
        res.json({
          success: false,
          message: "No category found",
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: "Error on category delete" + error,
      });
    }
  };



export { addCategory, categoryList, searchCategory, singleCategory, removeCategory };
