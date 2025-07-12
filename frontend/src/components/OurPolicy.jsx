import React from 'react'
import assets from '../assets/products'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '> 
    <div>
          <img src={assets.exchange} alt="description" className="w-16 m-auto mb-5" />
            <p className='font-semibold'> Easy Exchange Policy</p>
            <p className='text-gray-600'>We Offer Hassle Free Exchange Policy</p>
    </div>
     <div>
          <img src={assets.returnpolicy} alt="description" className="w-16 m-auto mb-5" />
            <p className='font-semibold'> 7 Days Return Policy</p>
            <p className='text-gray-600'>We Provide 7 Days Free Return Policy </p>
    </div>
     <div>
          <img src={assets.handsfree} alt="description" className="w-16 m-auto mb-5" />
            <p className='font-semibold'> Best Customers Support</p>
            <p className='text-gray-600'>We Provide 24/7 Customers Support</p>
    </div>
    </div>
  )
}

export default OurPolicy