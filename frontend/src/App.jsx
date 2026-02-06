import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import Todo from './pages/Todo'
import Login from './pages/Login'
import Signin from './pages/Signin'
import AddTodo from './pages/AddTodo'

const App = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/features' element={<Features/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/todo' element={<Todo/>}/>
            <Route path='/add-todo' element={<AddTodo/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signin' element={<Signin/>}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App