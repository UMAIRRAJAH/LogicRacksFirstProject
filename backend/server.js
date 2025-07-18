import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import cloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'; 
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js';
import newsletterRoute from './routes/newsletterRoute.js';

const app = express();

const port = process.env.PORT || 7000;
connectDB()
 .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
// app.get('/favicon.ico', (req, res) => res.status(204).end());
  

// Upload a   file
// api 
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/message', contactRouter); 


// Routes
app.get('/', (req, res) => {
  res.send('API Working on website');
});


export const handler = serverless(app);