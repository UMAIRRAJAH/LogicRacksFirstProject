import React from 'react';
import assets from '../assets/products';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox' 

const About = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-12 text-gray-800 text-center">
     <div className='text-center text-3xl'>
 <Title text1={'ABOUT '} text2={'US'}/>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 mb-16">
        <img
          src={assets.AboutUs}
          alt="About us"
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />
        <div>
          
            <p className="mb-6 text-lg leading-relaxed">
        At <strong>Rajah’s Apparel</strong>, we believe that clothing is more than just fabric — it’s an expression of culture, confidence, and individuality. Established with a passion for timeless design and modern elegance, 
      </p>

      

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="mb-6 text-lg leading-relaxed">
        Our mission is to redefine South Asian fashion by offering beautifully crafted garments with a modern edge. We’re committed to quality, affordability, and accessibility, ensuring everyone can embrace their heritage with pride and style.
      </p>
        </div>
      </div>

      {/* Bottom Section: */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-gray-100 rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-sm text-gray-600">
            To deliver high-quality fashion that celebrates culture and comfort.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-100 rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-sm text-gray-600">
            To be a leading brand known for authenticity and craftsmanship.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-100 rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-sm text-gray-600">
            Integrity, tradition, and innovation in every thread we weave.
          </p>
        </div>
      </div>
      
      <div className='pt-20'>
        <NewsletterBox/>
      </div>
    </div>
  );
};

export default About;
