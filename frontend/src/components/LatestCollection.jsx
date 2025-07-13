import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import Collection from '../pages/Collection';
// import { products } from '../assets/products';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
        const [latestProducts,setLatestProducts]=useState([]);
        useEffect(()=>{
                setLatestProducts(products.slice(0,6));
        },[products])
  return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST '} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover the newest additions to our store. From trendy styles to timeless pieces, <br></br>explore our latest products curated just for you.

        </p>
    </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4  '>
          {latestProducts.map((item, index) => (
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

export default LatestCollection;
