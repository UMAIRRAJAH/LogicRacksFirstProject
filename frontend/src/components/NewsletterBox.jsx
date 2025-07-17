import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Read from .env

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
  toast.warning("Please enter a valid email address.");
  return;
}

    const response = await axios.post(
      `${backendUrl}/api/newsletter/subscribe`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      setStatus(response.data.message || 'Subscribed successfully!');
      toast.success(response.data.message || 'Subscribed successfully!');
      console.log('✅ Newsletter subscribed:', response.data);
      setEmail('');
    } else {
      setStatus('Subscription failed. Try again.');
      toast.error('Subscription failed. Try again.');
    }
  } catch (err) {
    console.error('Subscription error:', err);

    if (err.response?.status === 409) {
      setStatus(err.response.data.message || 'Email already subscribed.');
      toast.info(err.response.data.message || 'Email already subscribed.');
    } else {
      setStatus('Subscription failed. Try again.');
      toast.error('Subscription failed. Try again.');
    }
  }
};

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now & get 10% off your Rajah Apparel order!
      </p>
      <p className='text-gray-500 mt-3'>
        Join our newsletter to stay updated on the latest arrivals, exclusive deals, and fashion tips from Rajah Apparel.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 px-3'
      >
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-sm px-6 py-2 rounded hover:bg-gray-800'
        >
          SUBSCRIBE
        </button>
      </form>

      {status && <p className='text-sm text-green-600'>{status}</p>}
    </div>
  );
};

export default NewsletterBox;
