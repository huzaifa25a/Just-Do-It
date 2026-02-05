import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-row w-full justify-between p-4'>
        <h2>Just Do It</h2>
        <div className='flex flex-row gap-6'>
            <NavLink 
                to='/home'
                className={`hover:text-[#B97D10] text-[#6A0C0B]`}
            >
                Home
            </NavLink>
            <NavLink 
                to='/features'
                className={`hover:text-[#B97D10] text-[#6A0C0B]`}
            >
                Features
            </NavLink>
            <NavLink 
                to='/about'
                className={`hover:text-[#B97D10] text-[#6A0C0B]`}
            >
                About
            </NavLink>
            <NavLink
                to='/contact'
                className={`hover:text-[#B97D10] text-[#6A0C0B]`}
            >
                Contact
            </NavLink>
            <NavLink 
                to='/todo'
                className={`hover:text-[#B97D10] text-[#6A0C0B]`}
            >
                My Todo
            </NavLink>
        </div>
        <div className='flex flex-row gap-6'>
            <NavLink 
                to='/add-todo'
                className={`hover:text-[#B97D10] text-[#6A0C0B]`}
            >
                Add Todo
            </NavLink>
        </div>
    </div>
  )
}

export default Header