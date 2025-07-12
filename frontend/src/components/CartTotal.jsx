import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const {currency,delivery_fees,getCartAmount}=useContext(ShopContext)
    console.log(ShopContext); 
  return (
    <div className='w-full'>
    <div className='text-2xl'>
        <Title text1={'CART '} text2={'TOTALS'}/>
    </div>
<hr/>
    <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>SubTotal</p>
            <p>{currency} {getCartAmount()}.00</p>

        </div>
        <div className='flex justify-between'>
            <p>Shipping Fees</p>
            <p>{currency} {delivery_fees}.00</p>

        </div>
        <hr/>
              <div className='flex justify-between'>
            <b>TOTAL</b>
            <b>{currency} {getCartAmount()===0?0: getCartAmount()+delivery_fees}.00</b>

        </div>


    </div>
     </div>
  )
}

export default CartTotal