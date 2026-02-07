const mongo = require('mongoose');

const Todo = new mongo.Schema({
    title: {type: String, required: true},
    description: {type: String},
    due_on: {type: String},
    status: {type: String, enum: ['Completed', 'In-Progress', 'Late'], required: true},
    priority: {type: String, enum: ['Low', 'Medium', 'High']},
    tags: {type: String},
    notes: {type: String},
    created_by: {
        name: {type: String},
        email: {type: String},
        id: {type: String}
    }
}, {timestamps: true})

module.exports = mongo.model('Todo', Todo);