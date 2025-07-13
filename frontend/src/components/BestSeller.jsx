import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { ShopContext } from '../Context/ShopContext';
import Title from '../components/Title'
const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestseller,setBestseller]=useState([]);
    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestseller));
        setBestseller(bestProduct.slice(0,6)) 
    },[products])
  return (
    <div className='my-10'>
       <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 text-center'>
               Shop our best-selling items, chosen by our customers as the most reliable, stylish, and high-performing products. Don't miss out on the items everyone’s raving about
            </p>
        {/* </Title> */}
       </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 '>
         {bestseller.map((item, index) => (
    <ProductItem
      key={index}
      userId={item._id}
      image={item.image}
      name={item.name}
      price={item.price}
    />
  ))}
            </div>
    </div>
  )
}
// 45

export default BestSeller