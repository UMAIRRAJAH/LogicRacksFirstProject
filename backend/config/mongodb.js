import mongoose from "mongoose";

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'e-commerce',
});

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
