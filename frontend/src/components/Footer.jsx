import React from 'react'
import assets from '../assets/products'

import { Link } from 'react-router-dom';
const Footer = () => {
  return (
      <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    <div>
     <img src={assets.logo} className='mb-5 w-32' alt="" />
    <p className="w-full md:w-2/3 text-gray-600">
         Rajah's Apparel combines tradition with modern design to create clothing that is both timeless and stylish. Our products are made with attention to detail and a commitment to quality.
      </p>
</div>
<div>
    <p className='text-xl font-medium mb-5'>    Our Compant</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}><Link to="/" className="hover:underline top-0">
        Home
          </Link></li>
            <li href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}> <Link to="/about" className="hover:underline top-0">
        About Us
          </Link></li>

            <li href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}> <Link to="/delivery" className="hover:underline top-0">
            Delivery
          </Link></li>
            <li href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}><Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link></li>
<li>
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="hover:underline"
    >
      ↑ Top
    </a>
  </li>
        </ul>
      

</div>
<div >
    <p className='text-xl font-medium mb-5'> GET IN TOUCH</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
    <li>021369383920</li>
    <li > Contact@RajahApparel.com</li>

    </ul>
</div>

</div>
<div className='bg-black text-white'>
    <hr/>
    <p className='py-5 text-sm text-center'>Umair Rajah</p>
</div>
</div>
  )
}

export default Footer;