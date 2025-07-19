import express from 'express';
import { addToCart, getUserCart, updateCartQuantity } from '../controllers/cartController.js';
import { verifyUser } from '../middleware/verifyUser.js';


const cartRouter = express.Router();

cartRouter.post('/get',  getUserCart);
cartRouter.post('/add',  addToCart);
cartRouter.post('/update', updateCartQuantity);

export default cartRouter;
