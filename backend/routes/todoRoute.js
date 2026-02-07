const express = require('express');
const Todo = require('../models/todo');
const Protect = require('../middleware/authMiddleware');
const user = require('../models/user');
const todo = require('../models/todo');

const router = express.Router();

router.post('/addTodo',Protect, async (req, res) => {
    try{
        const {title, description, due_on, status, priority, tags, notes} = req.body;
        const user = req.user
        const newTodo = await Todo.create({
            title: title,
            description: description,
            due_on: due_on,
            status: status,
            priotiry: priority,
            tags: tags,
            notes: notes,
            created_by: {
                name: user.name,
                email: user.email,
                id: user.id
            }
        });
        res.status(202).json({
            message: "Todo Created"
        })
    }
    catch(err){
        return res.status(500).json({message: 'Error creating todo'});
    }
})

router.get('/getTodo', Protect, async (req, res) => {
    try{
        const id = req.user.id;
        const found = await Todo.findOne({'created_by.id': id});
        const todo_list = await Todo.find({'created_by.id': id})
        res.status(200).json({
            Todo: todo_list,
            message: "Todo list received"
        })
    }
    catch(err){
        res.status(500).json({message: "Error fetching Todo list"});
    }
})

router.delete('/deleteTodo', Protect, async (req, res) => {
    try{
        const qr = req.query.id;
        const task = await todo.deleteOne({_id: qr})
        res.status(200).json({
            task,
            message: 'Task deleted!'
        })
    }
    catch(err){
        res.json({message: 'Could not delete task!'});
        console.log('error deleting --->',err)
    }
})

router.put('/updateTodo',Protect, async (req, res) => {
    try{
        const Id = req.body.id;
        const data = req.body;
        const task = await todo.findByIdAndUpdate(Id, data, {new: true});
        if(task){
            console.log(task);
            res.status(200).json({task, message: "Todo updated"});
        }
    }
    catch(err){
        console.log('errrr -->',err)
        res.status(400).json({message: 'Error updating todo'})
    }
})

module.exports = router;