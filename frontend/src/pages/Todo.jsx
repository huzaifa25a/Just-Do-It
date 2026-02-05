import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Todo = () => {
    const [Todo, setTodo] = useState([])

    useEffect(() => {
        async function getTotoList(){
            console.log('herehrererer')
            try{
                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/todo/getTodo`)
                 setTodo(response.data.Todo);
            }
            catch(err){
                console.log('Error fetching list --->',err)
            }
        }
        getTotoList();
    }, [])

  return (
    <div className='flex flex-col p-6 gap-6'>
        <h2 className='text-[24px] font-bold text-center'>TODO List</h2>
        <div className='flex flex-col gap-5'>
            <table className='border-2 border-gray-200 rounded-4xl'>
                <tr className='border-2 border-gray-300 bg-[#b48836] text-[#6a0201]'>
                    <th className='text-center border-gray-300 p-2'>To Do</th>
                    <th className='text-center border-gray-300'>Added</th>
                    <th className='text-center border-gray-300'>Last updated</th>
                    <th className='text-center border-gray-300'>Due on</th>
                    <th className='text-center border-gray-300'>Priority</th>
                    <th className='text-center border-gray-300'>Status</th>
                </tr>
                {Todo.map((todo, index) => (
                    <tr key={index} className={`border-2 border-gray-300 ${index%2 == 0 ? 'bg-gray-100' : null}`}>
                        <td className='border-2 border-gray-300 max-w-50 p-2'>
                            <div className='flex flex-col gap-3'>
                                <h2 className='text-[18px] font-bold'>{todo.title}</h2>
                                <div className='flex flex-col gap-2'>
                                    <span className='font-medium'>{todo.description}</span>
                                    <div className='flex flex-col gap-1'>
                                        <span className='font-normal'>Note: {todo.notes}</span>
                                        <span className='font-light text-[14px]'>Tags: {todo.tags}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className='text-center border-2 border-gray-300'>{todo.created_at}</td>
                        <td className='text-center border-2 border-gray-300'>{todo.updated_on}</td>
                        <td className={`text-center border-2 border-gray-300`}>{todo.due_on}</td>
                        <td className={`text-center border-2 border-gray-300`}>
                            <span className={`px-3 py-2 rounded-xl text-white ${todo.priority === 'High' ? 'bg-red-500' : todo.priority === 'Medium' ? 'bg-orange-400' : todo.priority === 'Low' ? 'bg-yellow-400' : null}`}>{todo.priority}</span>
                        </td>
                        <td className={`text-center border-2 border-gray-300`}>
                            <span className={`px-3 py-2 rounded-xl text-white ${todo.status === 'Completed' ? 'bg-green-500' : todo.status === 'In-Progress' ? 'bg-blue-500' : todo.status === 'Late' ? 'bg-red-500' : null}`}>{todo.status}</span>
                        </td>
                    </tr>
                ))}
            </table>
            
        </div>
    </div>
  )
}

export default Todo