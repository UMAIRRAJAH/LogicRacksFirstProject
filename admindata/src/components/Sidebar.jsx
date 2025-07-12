import React from 'react'
import { NavLink } from 'react-router-dom'
import assets from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[16px]'>
            <NavLink className='flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded' to='/add'>
                <img className='w-6 h-6' src={assets.plus}/>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded' to='/list'>
                <img className='w-6 h-6' src={assets.orders}/>
                <p className='hidden md:block'>List Items</p>
            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded' to='/orders'>
                <img className='w-6 h-6' src={assets.orders}/>
                <p className='hidden md:block'>Orders Items</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar