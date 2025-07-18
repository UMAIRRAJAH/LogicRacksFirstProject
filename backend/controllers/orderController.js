
import orderModel from "../models/orderModel.js";
import OrderModel from "../models/orderModel.js";
import Stripe from "stripe";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const placeOrder = async (req, res) => {
  try {
    const data = req.body.orderData || req.body;

    // Make sure this is BEFORE using amount
    const { address, items, amount, paymentMethod } = data;

    console.log("Incoming order data:", req.body);

    if (!address || !items || !items.length || !amount || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields or items are empty" });
    }

    const DELIVERY_FEE = 5.0;
    const totalAmount = parseFloat(amount) + DELIVERY_FEE;

    // Optional: card payment logic
    if (paymentMethod === "card") {
      // card payment integration here
    }

    const order = new OrderModel({
      userId: req.userId,
      address,
      items,
      amount: totalAmount,
      deliveryFee: DELIVERY_FEE,
      paymentMethod,
      status: "order placed",
      createdAt: Date.now(),
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("🔥 placeOrder server error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};


export const allOrders = async (req, res) => {
  try {
    const user = req.user;

    console.log("Inside allOrders controller, user:", req.user)  
    const orders = await OrderModel.find({}) 

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json({ orders });
  } catch (error) {
    console.error("Error in allOrders:", error);
    res.status(500).json({ message: "Server error retrieving orders" });
  }
};



export const userOrders = async (req, res) => {
  try {
    console.log("Fetching orders for userId:", req.userId); 

    const orders = await OrderModel.find({ userId: req.userId });
    console.log("Orders found:", orders.length);

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log("Update request => orderId:", orderId, "status:", status); 

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status Updated", order: updatedOrder });

  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const placeOrderStripe = async (req, res) => {
  try {
    console.log("Incoming stripe order:", req.body);

    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const currency = 'AED';
    const delivery_fee = 10;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId in request body" });
    }
    if (!address || !address.email) {
      return res.status(400).json({ error: "Missing address or email" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items must be a non-empty array" });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const email = address.email;

    const newOrder = new OrderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: 'stripe',  
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
      
          product_data: { name: 'Delivery Fee' },
        unit_amount: delivery_fee * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: 'Shipping Fee' },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
      customer_email: email,
    });

    res.status(200).json({ success: true, checkoutUrl: session.url });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ error: error.message || 'Something went wrong during checkout' });
  }
};

export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true, message: "Payment verified and order updated." });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed, order deleted." });
    }
  } catch (error) {
    console.error("Stripe verification error:", error.message);
    return res.status(500).json({ success: false, message: "Server error during payment verification" });
  }
};



