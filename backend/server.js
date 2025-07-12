import express from 'express';
import cors from 'cors';

import cloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'; 
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



const app = express();

const port = process.env.PORT || 7000;
connectDB()

console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
 // your configured module

// Upload a local file
// api endpoint
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter)

// Routes
app.get('/', (req, res) => {
  res.send('API Working on website');
});

// Start server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
