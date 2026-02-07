import React from 'react'
import linkedin from '../assets/icons8-linkedin.svg'
import gmail from '../assets/icons8-gmail.svg'
import github from '../assets/icons8-github.svg'

const Footer = () => {
  return (
    <div className='w-full border-t-2 border-gray-100 mt-15 bg-[#f1f6ff]'>
        <div className='p-4 flex flex-col items-center gap-2'>
            <div className='flex flex-row gap-3'>
              <a href='mailto:pachisahuzaifa@gmail.com'><img src={gmail} className='h-10'/></a>
              <a href='https://github.com/huzaifa25a' target='_blank'><img src={github} className='h-10'/></a>
              <a href='https://www.linkedin.com/in/huzaifa-pachisa/' target='_blank'><img src={linkedin} className='h-10'/></a>
            </div>
            <span>Created By: Huzaifa P.</span>
            <span>Copyright &copy; {new Date().getFullYear()}</span>
        </div>
    </div>
  )
}

export default Footer