import express from 'express'
import { placeOrder,userOrders,updateStatus,allOrders,placeOrderStripe, verifyStripe, } from '../controllers/orderController.js';

import { verifyUser } from '../middleware/verifyUser.js';


const orderRouter=express.Router()
//admin feauture
orderRouter.post('/list', allOrders)
orderRouter.post('/status',updateStatus)
// paymentFeature
orderRouter.post('/place',placeOrder)
// userFeatures
orderRouter.post('/userorders',userOrders)
orderRouter.post('/stripe',placeOrderStripe)
orderRouter.post('/verifyStripe',verifyStripe)
export default orderRouter;



