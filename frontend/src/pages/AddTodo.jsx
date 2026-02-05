import axios from 'axios';
import React, { useState } from 'react'

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
    <div className='w-full flex flex-col items-center'>
        <h2 className='text-[22px] font-medium'>Add an item to your Todo List</h2>
        <form onSubmit={submitEvent} className='flex flex-col gap-5'>
            <input
                className='rounded-lg p-2'
                placeholder='Title'
                type='text'
                name='title'
                value={form.title}
                onChange={handleChange}
                required
            />
            <input
                className='rounded-lg p-2'
                placeholder='Description'
                type='text'
                name='description'
                value={form.description}
                onChange={handleChange}
            />
            <input
                type='date'
                name='due_on'
                value={form.due_on}
                onChange={handleChange}
            />
            <select name='status' value={form.status} onChange={handleChange} required>
                <option value=''>Current status</option>
                <option value='In-Progress'>In-Progress</option>
                <option value='Completed'>Completed</option>
                <option value='Late'>Late</option>
            </select>
            <select name='priority' value={form.priority} onChange={handleChange}>
                <option value=''>Priority</option>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
            </select>
            <input
                className='rounded-lg p-2'
                placeholder='Add tags for quick search (optional)'
                type='text'
                name='tags'
                value={form.tags}
                onChange={handleChange}
            />
            <input
                className='rounded-lg p-2'
                placeholder='Add a note (optional)'
                type='text'
                name='note'
                value={form.note}
                onChange={handleChange}
            />
            <input
                type='submit'
            />
        </form>
    </div>
  )
}

export default AddTodo