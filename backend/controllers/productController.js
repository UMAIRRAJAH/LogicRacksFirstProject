// controllers/productController.js
import cloudinary from 'cloudinary';
import productModel from '../models/productModel.js';

import upload from '../config/multer.js';
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image = req.file;
    console.log(req.file);

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    console.log('Received image:', image);

    // Cloudinary upload via stream
    const filePath = image.path;
    const fileStream = fs.createReadStream(filePath);

    
    let result;
    try {
      result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        fileStream.pipe(stream);
      });

      fs.unlinkSync(filePath); // Cleanup temp file
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      return res.status(500).json({ success: false, message: 'Cloudinary upload failed' });
    }

    const imageUrl = result.secure_url;

    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (e) {
      return res.status(400).json({ success: false, message: 'Invalid sizes format' });
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === 'true',
      sizes: parsedSizes,
      image: imageUrl,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error('Server Error:', error);
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
  } catch (error) {
  console.error("Add Product Error:", error);
  res.status(500).json({ success: false, message: error.message });
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

