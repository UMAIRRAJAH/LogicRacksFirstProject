import React from 'react';
import assets from '../assets/products';

const Banner = () => {
  return (
 <div className="flex flex-col sm:flex-row border border-gray-400 mt-10">
  {/* Hero Left Side */}
  <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-4">
    <div className="text-[#414141]">
      <div className="flex items-center gap-2">
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
        <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
      </div>
      <h1 className=" .bungee-tint-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
      <div className="flex items-center gap-2">
        <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
      </div>
    </div>
  </div>

  {/* Hero Right Side */}
  <div className="w-full sm:w-1/2">
    <img
      src={assets.banner}
      className="w-full h-full object-cover"
      alt="Rajah Apparel Banner"
    />
  </div>
</div>

  );
};

export default Banner;
