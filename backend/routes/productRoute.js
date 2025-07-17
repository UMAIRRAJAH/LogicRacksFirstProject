import express from 'express'
const router = express.Router();
import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js';
// ✅ correct path
import upload from '../config/multer.js';

import { verifyUser } from '../middleware/verifyUser.js';



router.post('/add' ,verifyUser,  upload.single('image'), addProduct);

router.post('/remove',verifyUser, removeProduct);
router.post('/single',singleProduct);
router.get('/list', listProducts);

export default router;
