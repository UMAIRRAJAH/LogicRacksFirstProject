import React from 'react'
import assets from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[3%] justify-between'>
    <img className='w-[max(20%,100px)]' src={assets.logo} alt='logo'/>
<button onClick={()=> setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm'>
  LogOut
</button>
    </div>
  )
}

export default Navbar