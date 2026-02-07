import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/ContextHandler'
import { useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    const isHome = useLocation().pathname === "/";
    const {isLoggedIn, Logout} = useAuth();

    const handleLogout = () => {
        Logout();
        navigate('/');
    }
  return (
    <div className={`text-[18px] flex flex-row w-full justify-between p-8 ${isHome ? '' : 'bg-[#f1f6ff] border-b-2 border-gray-100'} mb-13`}>
        <h2 className='font-bold text-[22px] cursor-pointer'>Just Do It</h2>
        <div className='flex flex-row gap-12'>
            <NavLink 
                to='/'
                className={`border-transparent border-b-2 hover:border-b-[#7fb2ff] `}
            >
                Home
            </NavLink>
            <NavLink 
                to='/features'
                className={`border-transparent border-b-2 hover:border-b-[#7fb2ff]`}
            >
                Features
            </NavLink>
            {/* <NavLink 
                to='/about'
                className={`border-transparent border-b-2 hover:border-b-[#7fb2ff]`}
            >
                About
            </NavLink> */}
            <NavLink
                to='/contact'
                className={`border-transparent border-b-2 hover:border-b-[#7fb2ff]`}
            >
                Contact
            </NavLink>
        </div>
        {!isLoggedIn ? 
            <div className='flex flex-row gap-6'>
                <NavLink 
                    to='/login'
                    className={`border-transparent border-b-2 hover:border-b-[#7fb2ff]`}
                >
                    Login
                </NavLink>
                <NavLink 
                    to='/signin'
                    className={`text-white px-2 py-1 rounded-md bg-[#6fa5f7] hover:bg-[#76adff]`}
                >
                    Get Started
                </NavLink>
            </div>
            :
            <div className='flex flex-row gap-4'>
                <NavLink 
                    to='/todo'
                    className={`cursor-pointer text-white px-2 py-1 rounded-md w-25 text-center bg-[#42af42] hover:bg-[#448e44]`}
                >
                    My Todo
                </NavLink>
                <button 
                    onClick={handleLogout}
                    className={`cursor-pointer px-2 py-1 rounded-md text-red-500 hover:text-red-600`}
                >
                    Logout
                </button>
            </div>
        }
    </div>
  )
}

export default Header