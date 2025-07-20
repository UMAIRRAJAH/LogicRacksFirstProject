import contactModel from '../models/contactModel.js';
import nodemailer from 'nodemailer';

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new contactModel({ name, email, message });
    await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true, message: 'Message sent and saved!' });
  } catch (error) {
    console.error('Error in contact form:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
