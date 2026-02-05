const mongo = require('mongoose');

const Todo = new mongo.Schema({
    title: {type: String, required: true},
    description: {type: String},
    created_at: {type: String, required: true},
    due_on: {type: String},
    updated_on: {type: String},
    status: {type: String, enum: ['Completed', 'In-Progress', 'Late'], required: true},
    priority: {type: String, enum: ['Low', 'Medium', 'High']},
    tags: {type: String},
    notes: {type: String},
    // created_by: {
    //     name: {type: String},
    //     id: {type: String, required: true}
    // }
}, {timestamps: true})

module.exports = mongo.model('Todo', Todo);