import React from 'react';
import Title from '../components/Title';
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <div className='text-center text-3xl'>
 <Title text1={'Privacy '} text2={'Policy'}/>
      </div>
      <p className="mb-4">
        At Rajah's Apparel, your privacy is very important to us. This Privacy Policy outlines the types of information we collect, how we use it, and the choices you have regarding your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal information like name, email, phone number, and address.</li>
        <li>Payment and transaction details (processed securely).</li>
        <li>Website usage data via cookies and analytics tools.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process and deliver your orders.</li>
        <li>To improve our products, services, and user experience.</li>
        <li>To communicate updates, promotions, or support messages.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Access, edit, or delete your personal data.</li>
        <li>Opt-out of marketing communications anytime.</li>
        <li>Request data portability or restriction of processing.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. The latest version will always be available on our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact Us</h2>
      <p>
        If you have any questions or concerns about this policy, contact us at: <br />
        <span className="font-medium">support@rajahsapparel.com</span>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
