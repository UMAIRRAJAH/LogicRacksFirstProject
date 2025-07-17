import express from 'express'
import { placeOrder,userOrders,updateStatus,allOrders,placeOrderStripe, verifyStripe, } from '../controllers/orderController.js';

import { verifyUser } from '../middleware/verifyUser.js';


const orderRouter=express.Router()
//admin feauture
orderRouter.post('/list', verifyUser,allOrders)
orderRouter.post('/status',verifyUser,updateStatus)
// paymentFeature
orderRouter.post('/place',verifyUser,placeOrder)
// userFeatures
orderRouter.post('/userorders',verifyUser,userOrders)
orderRouter.post('/stripe',verifyUser,placeOrderStripe)
orderRouter.post('/verifyStripe',verifyUser,verifyStripe)
export default orderRouter;



