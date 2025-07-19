// components/UserDropdown.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import assets from '../assets/products';

const UserDropdown = ({ logout }) => {
  const { navigate } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <img
        src={assets.user}
        onClick={handleClick}
        className="w-10   mt-3 cursor-pointer"
        alt="User"
      />
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-30 bg-white shadow-lg rounded z-50 text-center">
          <div className="flex flex-col gap-2 py-2 bg-slate-100 text-gray-600 rounded">
            <p onClick={() => { navigate('/profile'); setIsOpen(false); }} className="cursor-pointer hover:text-black">My Profile</p>
            <p onClick={() => { navigate('/orders'); setIsOpen(false); }} className="cursor-pointer hover:text-black  ">My Orders</p>
            <p onClick={() => { logout(); setIsOpen(false); }} className="cursor-pointer hover:text-black">Log Out</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
