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
const router = express.Router(); // <--- THIS LINE IS NEEDED

const app = express();
router.get('/test', (req, res) => {
  res.send('Router works!');
});

connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors());
// 1
app.get('/api/user/admin', (req, res) => {
  res.json({ message: 'Admin route working' });
});
// 2
app.get('/api/user/register', (req, res) => {
  res.json({ message: 'Register route working' });
});
// 3
app.get('/api/user/login', (req, res) => {
  res.json({ message: 'Login route working' });
});
// four
app.get('/api/message/message', (req, res) => {
  res.json({ message: 'message api working' });
});
// five
app.get('/api/newsletter/subscribe', (req, res) => {
  res.json({ message: 'subscribe api working' });
});
// six
app.get('/api/cart/get', (req, res) => {
  res.json({ message: 'cart/get api working' });
});
// seven
app.get('/api/cart/add', (req, res) => {
  res.json({ message: 'cart/add api working' });
});
// 8
app.get('/api/cart/update', (req, res) => {
  res.json({ message: 'cart/update api working' });
});
//9
app.get('/api/order/list', (req, res) => {
  res.json({ message: 'order/list api working' });
});
//10
app.get('/api/order/status', (req, res) => {
  res.json({ message: 'order/status api working' });
});
//11
app.get('/api/order/place', (req, res) => {
  res.json({ message: 'order/place api working' });
});
//12
app.get('/api/order/userorders', (req, res) => {
  res.json({ message: 'order/userorders api working' });
});
//13
app.get('/api/order/stripe', (req, res) => {
  res.json({ message: 'order/stripe api working' });
});
// fourteen
app.get('/api/order/verifyStripe', (req, res) => {
  res.json({ message: 'order/verifyStripe api working' });
});
// fifteen
app.get('/api/product/remove', (req, res) => {
  res.json({ message: 'product/remove api working' });
});
// 16
app.get('/api/product/add', (req, res) => {
  res.json({ message: 'product/add api working' });
});
// 17
app.get('/api/product/single', (req, res) => {
  res.json({ message: 'product/single api working' });
});

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/newsletter', newsletterRoute);
app.use('/api/message', contactRouter);
// Define allowed origins


// Example route
app.get('/api/product/list', (req, res) => {
  res.json({ products: [] }); // example response
});

// Root route
app.get('/', (req, res) => {
  res.send(' Congratulation API working ');
});

// // 🔁 Export the handler
// export const handler = serverless(app);
// export default handler;
app.use(cors({
  origin: [
    'https://logic-racks-first-project-lc9k.vercel.app',
    'https://logic-racks-first-project-jo61.vercel.app'
  ]
}));

// CORS config with dynamic origin
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});