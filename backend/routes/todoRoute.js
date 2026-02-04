const express = require('express');
const Todo = require('../models/todo');
const Protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addTodo', Protect, (req, res) => {
    try{
        const {title, description, created_at, due_on, updated_on, status, priority, tags, notes} = req.body;
        const newTodo = Todo.create({
            title: title,
            description: description,
            created_at: created_at,
            due_on: due_on,
            updated_on: updated_on,
            status: status,
            priotiry: priority,
            tags: tags,
            notes: notes
        });
        res.status(202).json({
            newTodo,
            message: "Todo Created"
        })
    }
    catch(err){
        return res.status(500).json({message: 'Error creating todo'});
    }
})

module.exports = router;