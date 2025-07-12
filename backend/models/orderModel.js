// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  status:{type:String,required:true,default:'order placed'},
  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String,
  },
  items: [
    {
      _id: String,
      name: String,
      description: String,
      price: Number,
      image: [String],
      category: String,
      subCategory: String,
      sizes: [String],
      bestseller: Boolean,
      date: Number,
      
      size: String,
      quantity: Number,
    },
  ],
  amount: Number,
paymentMethod: {
  type: String,
  enum: ['cod', 'stripe'],
  required: true,
},

createdAt: { type: Date, default: Date.now }

}, { timestamps: true });

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
