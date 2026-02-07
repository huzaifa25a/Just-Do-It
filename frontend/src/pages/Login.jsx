import React, { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import {useAuth} from '../context/ContextHandler' 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {Login} = useAuth();
  const [LoginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  function changeHandler(e){
    setLoginDetails((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  async function handleLogin(){
    try{
      const login = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, LoginDetails)
      if(login){
        Login(login.data.token)
        navigate('/todo')
      }
    }
    catch(err){
      console.log('Login error -->', err)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <Header/>
      <div className='flex flex-col items-center gap-5 bg-[#f1f6ff] border-2 border-gray-100 shadow-md rounded-4xl p-5 w-100'>
        <h2 className='font-medium text-[18px]'>Login</h2>
        <input 
          className='px-2 py-1 bg-white rounded-md w-68 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
          placeholder='Email'
          type='email'
          name='email'
          value={LoginDetails.email}
          onChange={changeHandler}
        /> 
        <input 
          className='px-2 py-1 bg-white rounded-md w-68 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
          placeholder='Password'
          type='password'
          name='password'
          value={LoginDetails.password}
          onChange={changeHandler}
        />  
        <button 
          className='px-2 py-1 w-50 bg-[#6fa5f7] hover:bg-[#579aff] text-white rounded-md shadow-sm hover:shadow-md duration-100 cursor-pointer'
          type='button'
          onClick={handleLogin}
        >
          Login
        </button>
        <span>Don't have an account? <button className='cursor-pointer' onClick={() => navigate('/signin')}>Sign In</button></span>
      </div>
    </div>
  )
}

export default Login