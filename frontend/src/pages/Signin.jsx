import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { useAuth } from '../context/ContextHandler';

const Signin = () => {
  const {Login} = useAuth();
  const [SigninDetails, setSigninDetails] = useState({
    name: '',
    email: '',
    password: '',
    ConfirmPassword: ''
  })
  const navigate = useNavigate();

  function changeHandler(e){
    setSigninDetails((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  async function handleSignin(){
    try{
      const Signin = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, SigninDetails)
      if(Signin){
        Login(Signin.data.token);
        navigate('/todo')
      }
    }
    catch(err){
      console.log('Signin error -->', err)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <Header/>
      <div className='flex flex-col items-center gap-5 bg-[#f1f6ff] border-2 border-gray-100 shadow-md rounded-4xl p-5 w-[400px]'>
        <h2 className='font-medium text-[18px]'>Sign Up</h2>
        <input 
          className='px-2 py-1 bg-white rounded-md w-68 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
          placeholder='Enter Name'
          type='text'
          name='name'
          value={SigninDetails.name}
          onChange={changeHandler}
        /> 
        <input 
          className='px-2 py-1 bg-white rounded-md w-68 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
          placeholder='Enter Email'
          type='email'
          name='email'
          value={SigninDetails.email}
          onChange={changeHandler}
        /> 
        <input 
          className='px-2 py-1 bg-white rounded-md w-68 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
          placeholder='Enter Strong Password'
          type='password'
          name='password'
          value={SigninDetails.password}
          onChange={changeHandler}
        /> 
        <input 
          className='px-2 py-1 bg-white rounded-md w-68 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
          placeholder='Confirm Password'
          type='password'
          name='ConfirmPassword'
          value={SigninDetails.ConfirmPassword}
          onChange={changeHandler}

        /> 
        <button 
          className='px-2 py-1 w-50 bg-[#6fa5f7] hover:bg-[#579aff] text-white rounded-md shadow-sm hover:shadow-md duration-100 cursor-pointer'
          type='button'
          onClick={handleSignin}
        >
          Sign Up
        </button>
        <span>Already have an account? <button className='cursor-pointer' onClick={() => navigate('/login')}>Login</button></span>
      </div>
    </div>
  )
}

export default Signin