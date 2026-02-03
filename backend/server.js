const express = require('express');
const cors = require('cors');
const mongo = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongo.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Database connected successfully!');
})

app.use('/api/auth', require('./routes/authRoute'));
// app.use('/api/todo', require('./routes/todoRoute'));

app.listen(process.env.PORT, () => {
    console.log('Server listening at port 3000',);
})