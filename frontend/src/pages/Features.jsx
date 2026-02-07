import React from 'react'
import Header from '../components/Header'
import checklist from '../assets/checklist.svg'
import handshake from '../assets/handshake.svg'
import growth from '../assets/growth.svg'
import due_date from '../assets/due_date.svg'
import calendar from '../assets/calendar.svg'
import tags from '../assets/tags.svg'
import productivity from '../assets/productivity.svg'

const Features = () => {
  return (
    <>
      <Header/>
        <div className='flex flex-col gap-3 items-center'>
          <h3 className='font-medium text-5xl'>Powerful Features To Manage Your Tasks</h3>
          <div className='w-full flex flex-row gap-10 justify-center p-6 mt-10 flex-wrap'>
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
                <img src={productivity} className='h-15'/>
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-[18px]'>Boost Productivity</h3>
                  <span className='font-normal text-gray-500'>Track your progress and get more done.</span>
                </div>
              </div>
              <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
                <img src={due_date} className='h-15'/>
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-[18px]'>Easy Task Management</h3>
                  <span className='font-normal text-gray-500'>Quickly add, edit and delete tasks with an intuitive taskspace</span>
                </div>
              </div>
              <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
                <img src={calendar} className='h-15'/>
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-[18px]'>Priority & Due Dates</h3>
                  <span className='font-normal text-gray-500'>Prioritize your tasks and set due dates to stay on track.</span>
                </div>
              </div>
              <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
                <img src={tags} className='h-15'/>
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-[18px]'>Tagging & Categories</h3>
                  <span className='font-normal text-gray-500'>Organize your tasks with tags and categorize them for better</span>
                </div>
              </div>
              <div className='flex flex-row gap-5 bg-[#f2f7fe] shadow-md rounded-lg p-4 w-100'>
                <img src={growth} className='h-15'/>
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-[18px]'>Progress Tracking</h3>
                  <span className='font-normal text-gray-500'>Track your task progress and view completion status.</span>
                </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default Features