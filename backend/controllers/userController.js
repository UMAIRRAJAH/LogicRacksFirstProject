import { Router } from "express";
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password 
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

// Placeholder: Login & Admin
const loginUser = async (req, res) => {
  try{
    const {email,password}=req.body;
    const user=await userModel.findOne({email,})
    if(!user){
      return res.json({sucess :false,messga:"user doesn't exists"});

    }
    const isMatch= await bcrypt.compare(password,user.password)
      if(isMatch){
        const token=createToken(user._id)

res.json({success:true,token})   
   }else{
    res.json({success:false,messga:'Invalid credential'})

}
  }catch(error){
console.error("Registration error:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
 };
const adminLogin = async (req, res) => {
 try {
    const { email, password } = req.body;

    // Optional: Debug logs
    console.log("Input:", email, password);
    console.log("ENV:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'InValid Credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};







export { loginUser, registerUser, adminLogin };

