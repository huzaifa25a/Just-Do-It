const { Timestamp } = require('bson');
const mongo = require('mongoose');

const userData = mongo.Schema({
    name:     {type: String, required: true},
    email:    {type: String, required: true},
    password: {type: String, required: true}
}, {Timestamp: true})

module.exports = mongo.model('User', userData);