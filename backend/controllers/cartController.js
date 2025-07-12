import userModel from "../models/userModel.js";


export const addToCart = async (req, res) => {
  try {
     const token = req.headers.token; // ✅ Fix: extract token from headers
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
const decoded = jwtDecode(token); // safer than jwtDecode

const userId = decoded.id;

    const {  itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    // Ensure item entry exists
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // Ensure size entry exists
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 1;
    } else {
      cartData[itemId][size] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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
