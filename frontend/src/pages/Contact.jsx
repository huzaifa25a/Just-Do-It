import React, { useState } from 'react'
import Header from '../components/Header'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form);
  }
  return (
    <>
      <Header/>
      <div className='w-full flex justify-center'>
      <div className='p-6 flex flex-col w-auto items-center justify-center bg-[#f1f6ff] shadow-md gap-3'>
        <h2 className='font-medium'>Contact us by filling form below</h2>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
          <input
            className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
            type='text'
            name='name'
            placeholder='Name'
            value={form.name}
            onChange={handleChange}
          />
          <input
            className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
            type='email'
            name='email'
            placeholder='email'
            value={form.email}
            onChange={handleChange}
          />
          <input
            className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
            type='text'
            name='subject'
            placeholder='subject'
            value={form.subject}
            onChange={handleChange}
          />
          <textarea
            className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
            rows={6}
            name='message'
            placeholder='Message'
            value={form.message}
            onChange={handleChange}
          />
          <input
            className='px-2 py-1 bg-[#6fa5f7] hover:bg-[#579aff] text-white rounded-md shadow-sm hover:shadow-md duration-100 cursor-pointer'
            type='submit'
          />
        </form>
      </div>
      </div>
    </>
  )
}

export default Contact