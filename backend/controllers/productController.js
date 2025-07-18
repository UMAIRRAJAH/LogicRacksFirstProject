import cloudinary from '../config/cloudinary.js';
import productModel from '../models/productModel.js';
import fs from 'fs';

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    console.log("Received file:", image);
    console.log("Form fields:", req.body);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      folder: 'products',
    });

    // Delete temp file
    fs.unlinkSync(image.path);

    // Parse sizes safely
    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid sizes format' });
    }

    const product = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === 'true',
      sizes: parsedSizes,
      image: result.secure_url,
      date: Date.now(),
    });

    await product.save();

    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log("Fetched products:", products); 
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Product fetch error:", error); 
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try{
    // const { productId } = req.body;
await productModel.findByIdAndDelete(req.body.id);
// console.log('Deleting product with ID:', req.body.id);

    res.json({success:true,message:"Product Removed"})
  }catch(error){
    
    console.log(error)
      res.json({success:false,message:error.message})
  }
};
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

