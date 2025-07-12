import React from 'react';
import Title from '../components/Title';

const Delivery = () => {
  return (
    
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800  ">
    <div className='text-center text-3xl'>
 <Title text1={'Our '} text2={'Delivery'}/>
      </div>
      <p className="mb-4">
        At Rajah's Apparel, we strive to ensure that your orders reach you in the fastest and most secure way possible. Below are the details of our delivery process:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Shipping Times</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Standard Delivery:</strong> 3–5 business days</li>
        <li><strong>Express Delivery:</strong> 1–2 business days</li>
        <li><strong>International Shipping:</strong> 7–14 business days</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Shipping Charges</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Orders over ₹999:</strong> Free standard delivery</li>
        <li><strong>Orders under ₹999:</strong> ₹49 delivery fee</li>
        <li><strong>Express Delivery:</strong> ₹99 (regardless of order amount)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Tracking Your Order</h2>
      <p className="mb-4">
        Once your order is shipped, a tracking number will be shared via email/SMS. You can use it to check the real-time status of your delivery.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Delivery Partners</h2>
      <p className="mb-4">
        We work with trusted logistics partners like Delhivery, Blue Dart, and DTDC to ensure safe and timely deliveries.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Delays & Exceptions</h2>
      <p className="mb-4">
        Delivery delays may occur due to public holidays, extreme weather, or unforeseen logistics issues. We will keep you informed in such cases.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact for Support</h2>
      <p>
        Need help with your delivery? Contact our support team at: <br />
        <span className="font-medium">support@rajahsapparel.com</span>
      </p>
    </div>
  );
};

export default Delivery;
