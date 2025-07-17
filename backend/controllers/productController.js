// controllers/productController.js
import cloudinary from 'cloudinary';
import productModel from '../models/productModel.js';
import multer from '../middleware/multer.js'
 export const addProduct = async (req, res) => {
  try {
    const {name,description,price,category,subCategory,sizes,bestseller } = req.body;
    const image = req.file;


const image_man = req.file; // req.file single upload

    console.log('Image:', image_man);
console.log(req.file)
console.log(req.body)
if (image) {
  console.log('Image uploaded:', image.filename);
} else {
  console.log('No image uploaded');
}

    console.log("FILES:", req.file);

  const result = await cloudinary.uploader.upload(image.path, {
  resource_type: 'image',
  folder: 'products',
});

const imageUrl = result.secure_url;

const productData={
  name,
  description,
  category,
  price:Number(price),
  subCategory,
  bestseller:bestseller=="true"?true:false,
  sizes:JSON.parse(sizes),
  image:imageUrl,
  date:Date.now()
}
console.log(productData)
const product=new productModel(productData)
await product.save()

// console.log("image:", image ? image.filename : "undefined");
    
    res.json({success:true,message:"Product Added"});
  } catch (error) {
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

