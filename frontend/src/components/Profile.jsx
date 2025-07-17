import React from 'react';
const Profile = () => {
  return (

    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
 🌴 Welcome to our Website! 🌴
      </h1>

      <p className="text-gray-600 text-base sm:text-lg mb-6">
        We're thrilled to have you here! Whether you're a first-time visitor or a returning guest,
        we want to extend a warm and heartfelt welcome.
      </p>

      <p className="text-gray-600 text-base sm:text-lg mb-6">
        At <span className="font-semibold text-black">RajahApparel</span>, our goal is to provide
        you with an exceptional experience — from discovering our services or products to staying
        informed with the latest updates, tips, and exclusive offers. We believe in quality,
        creativity, and making sure that <span className="italic">you</span> — our visitor — feel at home here.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-left">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">🔹 What You Can Expect:</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>A clean, user-friendly experience across all devices</li>
          <li>High-quality content, products, or services tailored to your needs</li>
          <li>Regular updates, newsletters, or blog posts to keep you informed</li>
          <li>Exceptional customer service and support</li>
        </ul>
      </div>

      <p className="text-gray-600 text-base sm:text-lg mt-6">
        🌐 Whether you're browsing, shopping, or just exploring — <strong>we’re here for you</strong>.
        Feel free to navigate through our pages, check out our latest features, and don't hesitate to
        reach out if you have any questions.
      </p>

      <p className="mt-6 text-lg text-black font-medium">
        Thanks for visiting — we’re excited to share this journey with you!<br />
        <span className="text-indigo-600 font-bold">Let’s make something great together.</span>
      </p>
    </div>
  );
};

export default Profile;
