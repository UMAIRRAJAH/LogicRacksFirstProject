import React from 'react';
import assets from '../assets/products';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-16 text-gray-800 text-center">
       <div className='text-2xl font-bold text-gray-800 text-center'>
        <Title text1={'CONTACT '} text2={'US'}/>
</div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <div>
          <img src={assets.ContactUs}
            alt="Contact"
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Column - Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-gray-600 mt-2">
              Have questions or need help? We're here for you. Reach out to us any time!
            </p>
          </div>

          <div>
            <p><span className="font-semibold prata-regular"> ⛯ Address:</span> Jamia Cloth</p>
            <p><span className="font-semibold prata-regular"> 📱 Phone:</span> +93216699669</p>
            <p><span className="font-semibold prata-regular">📧 Email:</span> support@rajahapparel.com</p>
            <p><span className="font-semibold prata-regular"> ⌚ Hours:</span> Mon - Sat, 10:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>
      <div className='pt-20'>
        <NewsletterBox/>
      </div>
    </div>
    
  );
};

export default Contact;
