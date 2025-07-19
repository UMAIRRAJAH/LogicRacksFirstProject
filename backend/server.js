import express from 'express';
import cors from 'cors';
// import serverless from 'serverless-http';
import connectDB from './config/mongodb.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'; 
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js';
import newsletterRoute from './routes/newsletterRoute.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express(); // ✅ define `app` before using it
const router = express.Router(); 

// ✅ Now safe to use middleware
// Allow requests from your frontend domain



// ✅ Allow requests from your frontend
app.use(cors());

// Body parser middleware (if needed)
app.use(express.json());



// Database connection
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Dummy test route
router.get('/test', (req, res) => {
  res.send('Router works!');
});

// Your routes (as is, looks fine)
app.get('/api/user/admin', (req, res) => res.json({ message: 'Admin route working' }));
app.get('/api/user/register', (req, res) => res.json({ message: 'Register route working' }));
app.get('/api/user/login', (req, res) => res.json({ message: 'Login route working' }));
app.get('/api/message/message', (req, res) => res.json({ message: 'message api working' }));
app.get('/api/newsletter/subscribe', (req, res) => res.json({ message: 'subscribe api working' }));
app.get('/api/cart/get', (req, res) => res.json({ message: 'cart/get api working' }));
app.get('/api/cart/add', (req, res) => res.json({ message: 'cart/add api working' }));
app.get('/api/cart/update', (req, res) => res.json({ message: 'cart/update api working' }));
app.get('/api/order/list', (req, res) => res.json({ message: 'order/list api working' }));
app.get('/api/order/status', (req, res) => res.json({ message: 'order/status api working' }));
app.get('/api/order/place', (req, res) => res.json({ message: 'order/place api working' }));
app.get('/api/order/userorders', (req, res) => res.json({ message: 'order/userorders api working' }));
app.get('/api/order/stripe', (req, res) => res.json({ message: 'order/stripe api working' }));
app.get('/api/order/verifyStripe', (req, res) => res.json({ message: 'order/verifyStripe api working' }));
app.get('/api/product/remove', (req, res) => res.json({ message: 'product/remove api working' }));
app.get('/api/product/add', (req, res) => res.json({ message: 'product/add api working' }));
app.get('/api/product/single', (req, res) => res.json({ message: 'product/single api working' }));

// Real routers
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/message', contactRouter);

// Example route
app.get('/api/product/list', (req, res) => {
  res.json( { message: 'This is a public API!' });
});

// Root route
app.get('/', (req, res) => {
  res.send('˙✧˖°🎓 ༘⋆｡ ˚ Congratulation API working🥇');
});

// Start server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
