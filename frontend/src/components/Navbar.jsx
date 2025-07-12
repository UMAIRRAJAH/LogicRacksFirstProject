import React, { useContext, useState } from 'react'
import assets from '../assets/products';
import { Link, NavLink} from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
 const { setShowSearch , getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext); 
  const logout =()=>{
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    <div className='flex items justify-between py-5 font-medium'>
     <Link to='/'>  <img src={assets.logo} className='w-36'alt="Rajah Apparel Logo" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-800 relative top-3'>
            <NavLink to='/'  className='flex flex-col items-center gap-2 '>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
            </NavLink>
            <NavLink to='/collection'  className='flex flex-col items-center gap-2'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
            </NavLink>
            <NavLink to='/about'  className='flex flex-col items-center gap-2'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
            </NavLink>
            <NavLink to='/contact'  className='flex flex-col items-center gap-2'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
            
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img onClick={()=> setShowSearch(true)} src={assets.icons} className='w-6  min-w-5 cursor-pointer'/>
            <div className='group relative'>
        <img onClick={()=>token? null: navigate('/login') } src={assets.user} className='w-12 min-w-6 cursor-pointer'/>

                {token && <div className='group-hover:block hidden dropdown-menu   absolute right-0 top-full z-50 bg-white shadow-lg text-center'>
                    <div className='flex flex-col gap-2 w-30 py bg-slate-100 text-gray-500 rouded'>
                    <p id='navbar' className='cursor-pointer hover:text-black'>My Profile</p>
                    <p id='navbar' onClick={()=>{navigate('/orders')}} className='cursor-pointer hover:text-black'>Orders</p>
                    <p id='navbar' onClick={logout} className='cursor-pointer hover:text-black'>LogOut</p>
                    </div>
                </div>}
             
            </div>
             <Link to='/cart' className='relative'>
            <img src={assets.cart} className='w-9 min-w-5'/>

                <p className='absolute right-[-2px] bottom-[-1px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
              </Link>
              <img onClick={()=>setVisible(true)} src={assets.menu} className='w-8 min-w-8 cursor-pointer sm:hidden'/>
              {visible && (
  <div className="absolute top-16 right-0 bg-white w-full p-4 shadow-md transition-all border-b-gray-900 sm:hidden z-50">
    <NavLink to="/" className="block py-2" onClick={() => setVisible(false)}>Home</NavLink>
    <NavLink to="/collection" className="block py-2  border-b-gray-900" onClick={() => setVisible(false)}>Collection</NavLink>
    <NavLink to="/about" className="block py-2 border-b-gray-900" onClick={() => setVisible(false)}>About</NavLink>
    <NavLink to="/contact" className="block py-2  border-b-gray-900" onClick={() => setVisible(false)}>Contact</NavLink>
    <button onClick={() => setVisible(false)} className="text-gray-600 mt-2  border-b-gray-500">Close</button>
  </div>
)}
             
        </div>
   

    </div>
  )
}

export default Navbar