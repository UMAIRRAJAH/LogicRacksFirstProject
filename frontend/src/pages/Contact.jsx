import React, { useState } from 'react';
import axios from 'axios';
import assets from '../assets/products';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { toast } from 'react-toastify';

const Contact = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Please log in before contacting us.');
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `${backendUrl}/api/message/message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-16 text-gray-800 text-center">
      <div className="text-2xl font-bold text-gray-800 text-center">
        <Title text1={'CONTACT '} text2={'US'} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={assets.ContactUs}
            alt="Contact"
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-gray-600 mt-2">
              Have questions or need help? We're here for you. Reach out to us any time!
            </p>
          </div>

          <div className="space-y-1">
            <p><span className="font-semibold">⛯ Address:</span> Jamia Cloth</p>
            <p><span className="font-semibold">📱 Phone:</span> +93216699669</p>
            <p><span className="font-semibold">📧 Email:</span> support@rajahapparel.com</p>
            <p><span className="font-semibold">⌚ Hours:</span> Mon - Sat, 10:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-12 p-4">
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-black text-white px-4 py-2">
          Send
        </button>
      </form>

      <div className="pt-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Contact;
