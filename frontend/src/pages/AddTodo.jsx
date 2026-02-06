import axios from 'axios';
import React, { useState } from 'react'
import Header from '../components/Header'

const AddTodo = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        due_on: '',
        status: '',
        priority: '',
        tags: '',
        note: ''
    })

    function handleChange(e){
        setForm((form) => ({...form, [e.target.name]: e.target.value}));
    }

    async function submitEvent(e){
        e.preventDefault();
        try{
            const sendForm = await axios.post(`${import.meta.env.VITE_API_URL}/api/todo/addTodo`, {
                title: form.title,
                description: form.description,
                created_at: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                due_on: form.due_on,
                updated_on: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                status: form.status,
                priority: form.priority,
                tags: form.tags,
                notes: form.note
            })
            console.log(sendForm);
        }
        catch(err){
            console.log('Error creating todo -->',err)
        }
    }

  return (
    <>
    <Header/>
    <div className='w-full flex flex-col items-center mt-10'>
        <h2 className='text-[22px] font-medium'>Add an item to your Todo List</h2>
        <form onSubmit={submitEvent} className='p-6 flex flex-col w-auto items-center justify-center bg-[#f1f6ff] shadow-md gap-3'>
            <input
                className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
                placeholder='Title'
                type='text'
                name='title'
                value={form.title}
                onChange={handleChange}
                required
            />
            <input
                className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
                placeholder='Description'
                type='text'
                name='description'
                value={form.description}
                onChange={handleChange}
            />
            <input
            className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
                type='date'
                name='due_on'
                value={form.due_on}
                onChange={handleChange}
            />
            <select className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]' name='status' value={form.status} onChange={handleChange} required>
                <option value=''>Current status</option>
                <option value='In-Progress'>In-Progress</option>
                <option value='Completed'>Completed</option>
                <option value='Late'>Late</option>
            </select>
            <select className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'name='priority' value={form.priority} onChange={handleChange}>
                <option value=''>Priority</option>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
            </select>
            <input
                className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
                placeholder='Add tags for quick search (optional)'
                type='text'
                name='tags'
                value={form.tags}
                onChange={handleChange}
            />
            <input
                className='px-2 py-1 bg-white rounded-md w-80 border-2 border-[#a2c7ff] focus:outline-[#579aff]'
                placeholder='Add a note (optional)'
                type='text'
                name='note'
                value={form.note}
                onChange={handleChange}
            />
            <input
                className='px-2 py-1 bg-[#6fa5f7] hover:bg-[#579aff] text-white rounded-md shadow-sm hover:shadow-md duration-100 cursor-pointer'
                type='submit'
            />
        </form>
    </div>
    </>
  )
}

export default AddTodo