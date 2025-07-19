import React, { useContext, useState } from 'react';
import assets from '../assets/products';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  return (
    <div className="flex items justify-between py-5 font-medium relative">
      <Link to="/">
        <img src={assets.logo} className="w-30 mt-4 h-18" alt="Rajah Apparel Logo" />
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-800 relative top-8">
        <NavLink to="/" className="flex flex-col items-center gap-2">
          <p>HOME</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-2">
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-2">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-2">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        <img onClick={() => setShowSearch(true)} src={assets.icons} className="w-5  mt-1 cursor-pointer" />

        {/* User Dropdown or Login Redirect */}
        <div className="relative">
          {token
            ? <UserDropdown logout={logout} />
            : <img onClick={() => navigate('/login')} src={assets.user} className="w-10 top-0.5 cursor-pointer" />}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart} className="w-8 mt-0.5" />
          <p className="absolute right-[-2px] bottom-[-1px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img onClick={() => setVisible(true)} src={assets.menu} className="w-8 min-w-8 cursor-pointer sm:hidden" />
      </div>

      {/* Mobile Dropdown Menu */}
      {visible && (
        <div className="absolute top-16 right-0 bg-white w-full p-4 shadow-md transition-all border-b-gray-900 sm:hidden z-50">
          <NavLink to="/" className="block py-2" onClick={() => setVisible(false)}>Home</NavLink>
          <NavLink to="/collection" className="block py-2" onClick={() => setVisible(false)}>Collection</NavLink>
          <NavLink to="/about" className="block py-2" onClick={() => setVisible(false)}>About</NavLink>
          <NavLink to="/contact" className="block py-2" onClick={() => setVisible(false)}>Contact</NavLink>
          <button onClick={() => setVisible(false)} className="text-gray-600 mt-2">Close</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
