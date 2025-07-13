import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../components/Title'

import axios from 'axios'
const Orders = () => {
  const { backendUrl, token , currency } = useContext(ShopContext)
  const [orderData ,setOrderData]=useState([])

const loadOrderData = async () => {
  try {
    if (!token) return;

    const response = await axios.post(
      `${backendUrl}/api/order/userorders`,
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      let allOrdersItem = [];

      response.data.orders.forEach((order) => {
        const { status, paymentMethod, createdAt, _id: orderId } = order;

        order.items.forEach((item) => {
          allOrdersItem.push({
            ...item,
            status,
            paymentMethod,
            createdAt,
            orderId,
          });
        });
      });

      setOrderData(allOrdersItem.reverse());
    }
  } catch (error) {
    console.log(error);
  }
};



  useEffect(()=>{
    
  //    console.log("Token:", token);
  // console.log("Backend URL:", backendUrl);
    loadOrderData()
  },[token])
  return (
    <div className='border-t pt-16'>
      <div className='text-center'>
        <Title text1={'MY '} text2={'ORDER'} />
      </div>
      <div >
        
 
 { 
  orderData.map((item, index) => (
  <div
    key={index}
    className='py-4 border-t border-b border-black text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
  >
  
            <div className='flex items-start gap-6 text-sm'>
            
              <img className='w-20 sm:w-20 rounded-2xl' src={item.image} />
              <div>
                        <p className='sm:text-base font-bold bg-sky-500/100 rounded-2xl p-1 text-center'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base font-bold text-black'>
                  <p className='text-lg  bg-amber-600 p-1 rounded-sm text-white'>{currency}{item.price}</p>
                  <p className='text-lg bg-lime-600 text-white p-1 rounded-sm '>Quantity:{item.quantity}</p>
                  <p className='text-lg bg-pink-600 p-1 text-white rounded-sm '>Size:{item.size}</p>

                </div>
                <p  className='mt-2 text-center text-blue-500'>
  Date: <span className='text-gray-800 font-bold'>
 {item.createdAt && !isNaN(new Date(item.createdAt).getTime())
      ? new Date(item.createdAt).toLocaleDateString()
      : 'N/A'}
  </span>
</p>

                <p className='mt-2 text-center text-blue-500'>Payment:<span className='text-gray-800 font-bold'> {item.paymentMethod}</span></p>
              
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex flex-center gap-2  '>
               <p className='min-w-4 h-4 rounded-full bg-lime-900 '></p>
<p className={`text-xl-2 md:text-base font-bold  leading-tight `}>
  {item.status}
</p>

              </div>
              <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm bg-lime-300 '>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
// 4                                 
// 5
export default Orders;