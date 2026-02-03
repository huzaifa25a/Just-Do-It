const mongo = require('mongoose');

const Todo = mongo.Schema({
    title: {type: String, required: true},
    description: {type: String},
    created_at: {type: String, required: true},
    due_on: {type: String},
    updated_on: {type: String},
    status: {type: String, enum: ['Completed', 'In-Progress', 'Late'], required: true},
    priority: {type: String, enum: ['Low', 'Medium', 'High']},
    tags: {type: String},
    notes: {type: String}
})

module.exports = mongo.model('Todo', Todo);