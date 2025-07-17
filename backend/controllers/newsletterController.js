import nodemailer from 'nodemailer';
import Subscriber from '../models/NewsletterSubscriber.js';
import dotenv from 'dotenv';

dotenv.config(); // ✅ load .env

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,       // your Gmail address
    pass: process.env.GMAIL_PASS,       // Gmail App Password, not real password
  },
});

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }

    // Save to DB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send welcome email
    await transporter.sendMail({
      from: `"Rajah Apparel" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thanks for Subscribing!',
      text: 'Welcome to Rajah Apparel! You’ve been added to our newsletter.',
    });

    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    console.error('Newsletter Subscription Error:', err);
    res.status(500).json({ success: false, message: 'Server error. Try again later.' });
  }
};
