import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextHandler'
import Header from '../components/Header'
import bg from '../assets/bg-3.png'
import checklist from '../assets/checklist.svg'
import graph from '../assets/graph.svg'
import handshake from '../assets/handshake.svg'

const Home = () => {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();
  const style = {
    backgroundImage: `url(${bg})`,
    height: 'full',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
  return (
    <div>
      <div id='hero_section' className='flex flex-row justify-around flex-wrap' style={style}> 
        <Header/>
        <div className='flex flex-col w-full items-left p-10 gap-10 mt-10'>
          <div className='max-w-136.25'>
            <h2 className='font-medium text-6xl'>Organize Your Tasks Efficiently</h2>
          </div>
          <span className='max-w-136.25 font-normal text-2xl text-gray-500'>Manage your daily tasks with ease. Stay on top of your work and increase productivity.</span>
          <div className='flex flex-row gap-5'>
            <button className='px-2 py-1 bg-[#6fa5f7] hover:bg-[#76adff] text-white rounded-md shadow-sm hover:shadow-md duration-100 cursor-pointer' onClick={() => isLoggedIn ? navigate('/todo') : navigate('/signin') }>Get Started</button>
            <button className='px-2 py-1 bg-[#ffffff] hover:bg-[#ffffff] rounded-md hover:shadow-md duration-100 cursor-pointer border-2 border-gray-200' onClick={() => navigate('/features')}>Learn More</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3 items-center'>
      <div className='flex flex-row gap-10 p-6 mt-10 flex-wrap'>
          <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
            <img src={handshake} className='h-15'/>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-[18px]'>Easy to Use</h3>
              <span className='font-normal text-gray-500'>Simple and intuitive interface to manage your tasks.</span>
            </div>
          </div>
          <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
            <img src={checklist} className='h-15'/>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-[18px]'>Stay Organized</h3>
              <span className='font-normal text-gray-500'>Categorize Tasks by priority and due dates.</span>
            </div>
          </div>
          <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
            <img src={graph} className='h-15'/>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-[18px]'>Boost Productivity</h3>
              <span className='font-normal text-gray-500'>Track your progress and get more done.</span>
            </div>
          </div>
      </div>
      <span className='font-normal text-gray-600'>Stay focused and productive with our easy-to-use todo list app</span>
      </div>
    </div>
  )
}

export default Home