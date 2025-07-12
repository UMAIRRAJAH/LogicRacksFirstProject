import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({userId,image,name,price}) => {
    const {currency}=useContext(ShopContext)
  return (
 <Link to={`/product/${userId}`} className=' text-gray-700 cursor-pointer' >

<div className='overflow-hidden text-center'>

<img
  className="hover:scale-110 transition-transform duration-300 ease-in-out rounded-lg w-64 h-64"
  src={image[0]}
  alt={name}
/>


</div>

<p className='pt-3 pb-1 text-sm text-center'>{name}</p>

<p className='text-sm tefont-medium text-center'>{currency}{price}</p>

</Link>

  )
}

export default ProductItem