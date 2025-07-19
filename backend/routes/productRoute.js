import express from 'express'
const router = express.Router();

import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js';
// ✅ correct path
import upload from '../middleware/multer.js';

import { verifyUser } from '../middleware/verifyUser.js';



router.post('/add' , upload.single('image'), addProduct);

router.post('/remove', removeProduct);
router.post('/single',singleProduct);
router.get('/list', listProducts);

export default router;
