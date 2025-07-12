/* eslint-disable no-unused-vars */
 
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../components/Title';
import assets from '../assets/products';
import CartTotal from '../components/cartTotal';
const Cart = () => {
const { products, currency, cartItems, updateCartQuantity,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if(products.length>0){
       const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    setCartData(tempData); 
    }
    }
   
  }, [cartItems,products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR '} text2={'CART'} />
      </div>
<div>
      {cartData.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                    <p  >
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:border bg-slate-100"> {item.size}</p>
                  </div>
                  </div>
                </div>
           <input type="number" min={1} defaultValue={item.quantity} className="border max-w-[2.5rem] sm:max-w-[5rem] px-1 sm:px-2 py-1" onChange={(e) => {const val = e.target.value; if (val === '' || val === '0') return;updateCartQuantity(item._id, item.size, Number(val));
  }}
/>

               <img  onClick={(e) => updateCartQuantity(item._id, item.size, 0)}
  className="w-4 mr-4 cursor-pointer"
  src={assets.remove}
/>
              </div>
            );
          })}
        </div>
        
      )}
    </div>
    <div className='flex justify-end my-20'>
    <div className='w-full sm:w-[450px]'>
    <CartTotal/><br/>
      <div className='w-full text-end'>
        <button onClick={()=> navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 '  >PROCEED TO CHECKOUT</button>
      </div>
    </div>

    </div>
    </div>
  );
};

export default Cart;
