import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddTodo from '../components/AddTask'
import { data, useNavigate } from "react-router-dom";
import edit from "../assets/edit.svg";
import bin from "../assets/delete.svg";
import tick from '../assets/tick.svg'
import cancel from '../assets/cancel.svg'
import up from '../assets/up-arrow.svg'
import down from '../assets/down-arrow.svg'

const Todo = () => {
  const [Todo, setTodo] = useState([]);
  const [Id, setId] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [editId, setEditId] = useState("");
  const [updateDue, setUpdateDue] = useState("")
  const [dueDateEdit, setDueDateEdit] = useState({
    id: '',
    due_on: new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
  })
  const [updatedForm, setUpdatedForm] = useState({
    id: '',
    title: '',
    description: '',
    notes: '',
    tags: ''
  })
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [Direction, setDirection] = useState('');
  const options = {
    year: 'numeric',
    month: 'short', // 'short' gives 'Feb'
    day: 'numeric',
  };
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getTotoList() {
      console.log("herehrererer");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/todo/getTodo`,
          {headers: {authorization: `Bearer ${token}`}}
        );
        setTodo(response.data.Todo);
      } catch (err) {
        console.log("Error fetching list --->", err);
      }
    }
    getTotoList();
  }, []);

  function handleUpdateChange(e){
    setUpdatedForm((data) => ({...data, [e.target.name]: e.target.value}));
  }

  async function handleEdit() {
    try{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/todo/updateTodo`, updatedForm, 
            {headers: {authorization: `Bearer ${token}`}}
        )
        console.log(response.data);
        setEditId('');
        window.location.reload();
    }
    catch(err){
        console.log('Error sending updated data --->',err)
    }
  }

  function handleDueDateUpdateChange(e){
    setDueDateEdit((data) => ({...data, [e.target.name]: e.target.value}));
    console.log(dueDateEdit)
  }

  async function handleDueDateEdit() {
    try{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/todo/updateTodo`, dueDateEdit, 
            {headers: {authorization: `Bearer ${token}`}}
        )
        console.log(response.data);
        setUpdateDue('');
        window.location.reload();
    }
    catch(err){
        console.log('Error sending updated data --->',err)
    }
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/todo/deleteTodo`,
        {
          headers: {authorization: `Bearer ${token}`},
          params: { id: Id },
        },
      );
      setShowMessage(false);
      window.location.reload();
    } catch (err) {
      console.log("error deleting -->", err);
    }
  }

  function sortHandle(){
    console.log('hereee')
    if(sortBy === 'Priority'){
      const priorityOrder = {"High": 3, "Medium": 2, "Low": 1}
      if(Direction === 'asc'){
        console.log('inside')
        const todo = [...Todo].sort((a,b) => {return priorityOrder[b.priority] - priorityOrder[a.priority]});
        setTodo(todo)
      }
      else if(Direction === 'desc'){
        const todo = [...Todo].sort((a,b) => {return priorityOrder[a.priority] - priorityOrder[b.priority]});
        setTodo(todo)
      }
    }

    if(sortBy === 'due_on'){
      if(Direction === 'asc'){
        const todo = [...Todo].sort((a,b) => {return new Date(b.due_on) - new Date(a.due_on)});
        setTodo(todo);
      }
      if(Direction === 'desc'){
        const todo = [...Todo].sort((a,b) => {return new Date(a.due_on) - new Date(b.due_on)});
        setTodo(todo);
      }
    }

    if(sortBy === 'createdAt'){
      if(Direction === 'asc'){
        const todo = [...Todo].sort((a,b) => {return new Date(b.createdAt) - new Date(a.createdAt)});
        setTodo(todo);
      }
      if(Direction === 'desc'){
        const todo = [...Todo].sort((a,b) => {return new Date(a.createdAt) - new Date(b.createdAt)});
        setTodo(todo);
      }
    }

    if(sortBy === 'updatedAt'){
      if(Direction === 'asc'){
        const todo = [...Todo].sort((a,b) => {return new Date(b.updatedAt) - new Date(a.updatedAt)});
        setTodo(todo);
      }
      if(Direction === 'desc'){
        const todo = [...Todo].sort((a,b) => {return new Date(a.updatedAt) - new Date(b.updatedAt)});
        setTodo(todo);
      }
    }

    if(sortBy === 'status'){
      const statusOrder = {"Completed": 3, "In-Progress": 2, "Late": 1}
      if(Direction === 'asc'){
        const todo = [...Todo].sort((a,b) => {return statusOrder[b.status] - statusOrder[a.status]});
        setTodo(todo);
      }
      if(Direction === 'desc'){
        const todo = [...Todo].sort((a,b) => {return statusOrder[a.status] - statusOrder[b.status]});
        setTodo(todo);
      }
    }
  }

  return (
    <>
      <div
        className={`${showMessage || showTodoForm ? "pointer-events-none select-none blur-sm" : ""}`}
      >
        <Header />
        <div className="flex flex-col p-6 gap-3 mt-10">
          <h2 className="text-[24px] font-bold text-center">TODO List</h2>
          <div className="flex flex-col gap-2">
            <button
              className={`rounded-md self-end cursor-pointer text-white px-2 py-1 w-25 text-center bg-[#42af42] hover:bg-[#448e44]`}
              onClick={() => setShowTodoForm(true)}
            >
              Add +
            </button>
            <div className="rounded-lg shadow-lg">
              <table className="border-2 border-gray-200 rounded-4xl w-full">
                <tr className="border-2 border-gray-300 bg-[#65a2fe] text-white">
                  <th className="text-center border-gray-300 p-2">To Do</th>
                  <th className="text-center border-gray-300">
                    <div className="flex flex-row gap-5 items-center justify-center">
                        <span>Added</span>
                        <div className="flex flex-row gap-2">
                          <button onClick={() => {setSortBy('createdAt'), setDirection('asc'), sortHandle()}}>
                            <img src={up} className="h-4 cursor-pointer"/>
                          </button>
                          <button onClick={() => {setSortBy('createdAt'), setDirection('desc'), sortHandle()}}>
                            <img src={down} className="h-4 cursor-pointer"/>
                          </button>
                        </div>
                    </div>
                  </th>
                  <th className="text-center border-gray-300">
                    <div className="flex flex-row gap-5 items-center justify-center">
                      <span>Last Updated</span>
                      <div className="flex flex-row gap-2">
                        <button onClick={() => {setSortBy('updatedAt'), setDirection('asc'), sortHandle()}}>
                          <img src={up} className="h-4 cursor-pointer"/>
                        </button>
                        <button onClick={() => {setSortBy('updatedAt'), setDirection('desc'), sortHandle()}}>
                          <img src={down} className="h-4 cursor-pointer"/>
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="text-center border-gray-300">
                    <div className="flex flex-row gap-5 items-center justify-center">
                      <span>Due On</span>
                      <div className="flex flex-row gap-2">
                        <button onClick={() => {setSortBy('due_on'), setDirection('asc'), sortHandle()}}>
                          <img src={up} className="h-4 cursor-pointer"/>
                        </button>
                        <button onClick={() => {setSortBy('due_on'), setDirection('desc'), sortHandle()}}>
                          <img src={down} className="h-4 cursor-pointer"/>
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="text-center border-gray-300">
                    <div className="flex flex-row gap-5 items-center justify-center">
                      <span>Priority</span>
                      <div className="flex flex-row gap-2">
                        <button onClick={() => {setSortBy('Priority'), setDirection('asc'), sortHandle()}}>
                          <img src={up} className="h-4 cursor-pointer"/>
                        </button>
                        <button onClick={() => {setSortBy('Priority'), setDirection('desc'), sortHandle()}}>
                          <img src={down} className="h-4 cursor-pointer"/>
                        </button>
                      </div>
                    </div>
                  </th>
                  <th className="text-center border-gray-300">
                  <div className="flex flex-row gap-5 items-center justify-center">
                      <span>Status</span>
                      <div className="flex flex-row gap-2">
                        <button onClick={() => {setSortBy('status'), setDirection('asc'), sortHandle()}}>
                          <img src={up} className="h-4 cursor-pointer"/>
                        </button>
                        <button onClick={() => {setSortBy('status'), setDirection('desc'), sortHandle()}}>
                          <img src={down} className="h-4 cursor-pointer"/>
                        </button>
                      </div>
                    </div>
                  </th>
                </tr>
                {Todo.map((todo, index) => (
                  <tr
                    key={index}
                    className={`border-2 border-gray-300 ${
                      index % 2 == 0 ? "bg-gray-100" : null
                    }`}
                  >
                    <td className="border-2 border-gray-300 max-w-50 p-2">
                      <div>
                        {editId === todo._id ? (
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-2">
                                <label className="min-w-21"  htmlFor="title">Title:</label>
                                <input
                                type="text"
                                placeholder='Title'
                                name="title"
                                value={updatedForm.title}
                                onChange={handleUpdateChange}
                                className={`${
                                    index % 2 == 0 ? "bg-white" : "bg-gray-100"
                                } w-80 min-w-40 rounded-md border-2 border-gray-300 px-2 focus:outline-gray-500`}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <label className="min-w-21" htmlFor="description">Description:</label>
                                    <textarea
                                        type="text"
                                        placeholder='Description'
                                        name="description"
                                        rows={3}
                                        value={updatedForm.description}
                                        onChange={handleUpdateChange}
                                        className={`${
                                            index % 2 == 0 ? "bg-white" : "bg-gray-100"
                                        } w-80 min-w-40 rounded-md border-2 border-gray-300 px-2 focus:outline-gray-500`}
                                    />
                                </div>
                              <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2">
                                    <label className="min-w-21" htmlFor="notes">Note:</label>
                                    <textarea
                                        type="text"
                                        placeholder='Add a note (optional)'
                                        name="notes"
                                        rows={2}
                                        value={updatedForm.notes}
                                        onChange={handleUpdateChange}
                                        className={`${
                                            index % 2 == 0 ? "bg-white" : "bg-gray-100"
                                        } w-80 min-w-40 rounded-md border-2 border-gray-300 px-2 focus:outline-gray-500`}
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <label className="min-w-21" htmlFor="tags">Tags:</label>
                                    <input
                                        type="text"
                                        placeholder='Add tags for quick search (optional)'
                                        name="tags"
                                        value={updatedForm.tags}
                                        onChange={handleUpdateChange}
                                        className={`${
                                            index % 2 == 0 ? "bg-white" : "bg-gray-100"
                                        } w-80 min-w-40 rounded-md border-2 border-gray-300 px-2 focus:outline-gray-500`}
                                    />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row gap-3">
                              <button
                                className="cursor-pointer text-white px-2 py-1 shadow-sm rounded-sm hover:bg-[#81b2fc] bg-[#63a2ff]"
                                onClick={handleEdit}
                              >
                                Update
                              </button>
                              <button
                                className="cursor-pointer px-2 py-1 shadow-sm rounded-sm border-2 border-gray-200 hover:bg-gray-200"
                                onClick={() => setEditId("")}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <h2 className="text-[18px] font-bold">
                              {todo.title}
                            </h2>
                            <div className="flex flex-col gap-2">
                              <span className="font-medium">
                                {todo.description}
                              </span>
                              <div className="flex flex-col gap-1">
                                <span className="font-normal">
                                  Note: {todo.notes}
                                </span>
                                <span className="font-light text-[14px]">
                                  Tags: {todo.tags}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-row gap-3">
                              <button onClick={() => {
                                        setEditId(todo._id), 
                                        updatedForm.id = todo._id,
                                        updatedForm.title = todo.title, 
                                        updatedForm.description = todo.description
                                        updatedForm.notes = todo.notes,
                                        updatedForm.tags = todo.tags
                                }}>
                                <img
                                  src={edit}
                                  className="h-5 cursor-pointer"
                                />
                              </button>
                              <button
                                onClick={() => {
                                  setShowMessage(true), setId(todo._id);
                                }}
                              >
                                <img src={bin} className="h-5 cursor-pointer" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center border-2 border-gray-300">
                      {todo.createdAt ? new Intl.DateTimeFormat('en-US', options).format(new Date(todo.createdAt)) : null}
                    </td>
                    <td className="text-center border-2 border-gray-300">
                      {todo.updatedAt ? new Intl.DateTimeFormat('en-US', options).format(new Date(todo.updatedAt)) : null}
                    </td>
                    {updateDue === todo._id ?
                    <td className={`text-center border-2 border-gray-300`}>
                        <div className="flex flex-row gap-3 justify-center">
                            <input
                                type='date'
                                name='due_on'
                                value={dueDateEdit.due_on}
                                onChange={handleDueDateUpdateChange}
                                className={`${
                                    index % 2 == 0 ? "bg-white" : "bg-gray-100"
                                }  rounded-md border-2 border-gray-300 px-2 focus:outline-gray-500`}
                            />
                            <div className="flex flex-row gap-2">
                                <button 
                                    className="bg-[#42af42] hover:bg-[#448e44] rounded-md cursor-pointer"
                                    onClick={handleDueDateEdit}
                                >
                                    <img src={tick} className="h-7"/>
                                </button>
                                <button 
                                    className="bg-[#ff7070] hover:bg-[#de3939] px-1.5 rounded-md cursor-pointer"
                                    onClick={() => setUpdateDue('')}
                                >
                                    <img src={cancel} className="h-4"/>
                                </button>
                            </div>
                        </div>
                    </td>
                    :
                    <td className={`text-center border-2 border-gray-300`}>
                        <div className="flex flex-row gap-5 justify-center">
                            {todo.due_on ? new Intl.DateTimeFormat('en-US', options).format(new Date(todo.due_on)) : null}
                            <button onClick={() => {
                                    setUpdateDue(todo._id), 
                                    dueDateEdit.id = todo._id
                                    dueDateEdit.due_on = todo.due_on
                                }}>
                                <img
                                  src={edit}
                                  className="h-4 cursor-pointer"
                                />
                            </button>
                        </div>
                    </td>
                    }
                    <td className={`text-center border-2 border-gray-300`}>
                      <span
                        className={`px-3 py-2 rounded-xl text-white ${
                          todo.priority === "High"
                            ? "bg-red-500"
                            : todo.priority === "Medium"
                            ? "bg-orange-400"
                            : todo.priority === "Low"
                            ? "bg-yellow-400"
                            : null
                        }`}
                      >
                        {todo.priority}
                      </span>
                    </td>
                    <td className={`text-center border-2 border-gray-300`}>
                      <span
                        className={`px-3 py-2 rounded-xl text-white ${
                          todo.status === "Completed"
                            ? "bg-green-500"
                            : todo.status === "In-Progress"
                            ? "bg-blue-500"
                            : todo.status === "Late"
                            ? "bg-red-500"
                            : null
                        }`}
                      >
                        {todo.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="todoForm">
        <AddTodo showTodoForm={showTodoForm} setShowTodoForm={setShowTodoForm}/>
      </div>
      {showMessage ? (
        <div className="flex items-center justify-center fixed inset-0 z-999 w-full bg-black/70">
          <div className="bg-white rounded-lg shadow-md border-2 border-gray-100 flex flex-col gap-6 items-center p-5 w-100">
            <span>Are you sure you want to delete this task?</span>
            <div className="flex flex-row gap-4">
              <button
                className="bg-white shadow-sm px-2 py-1 w-20 border-2 border-gray-200 rounded-md hover:bg-gray-200 hover:shadow-md duration-100 cursor-pointer"
                onClick={() => setShowMessage(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#d42222] hover:bg-[#981717] text-white shadow-sm px-2 py-1 w-20 rounded-md hover:shadow-md duration-100 cursor-pointer"
                onClick={() => handleDelete(Id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Todo;
