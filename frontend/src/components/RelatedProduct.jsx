import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(productsCopy.slice(0, 6)); 
    }
  }, [products, category, subCategory]);


  return (
    <div className='my-20'>
      <div className='text-center text-2xl mb-8'>
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem
            key={item._id || index}
            userId={item._id || index}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};





export default RelatedProduct