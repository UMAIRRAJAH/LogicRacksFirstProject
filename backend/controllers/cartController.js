import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

export const addToCart = async (req, res) => {
  try {
    console.log("🔵 Incoming request:", req.body);

    const { userId, itemId, size } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "User ID, Item ID, and Size are required",
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("🟢 User found:", userData.name);

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });

  } catch (error) {
    console.error("❌ Error in addToCart:", error);  // <--- key line
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



export const updateCartQuantity = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
