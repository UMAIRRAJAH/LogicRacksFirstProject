import express from 'express';
import { addToCart, getUserCart, updateCartQuantity } from '../controllers/cartController.js';
import { verifyUser } from '../middleware/verifyUser.js';


const cartRouter = express.Router();

cartRouter.post('/get',verifyUser,  getUserCart);
cartRouter.post('/add', verifyUser, addToCart);
cartRouter.post('/update',verifyUser, updateCartQuantity);

export default cartRouter;
