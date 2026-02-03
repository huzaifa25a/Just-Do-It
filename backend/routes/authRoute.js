const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userData = require('../models/user');

const router = express.Router();

router.post('/signin', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const exists = userData.findOne({email});
        if(exists){
            return res.status(500).json({message: 'User already exists!'})
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = userData.create({
            name: name,
            email: email,
            password: hashed
        })
        const token = jwt.sign({name, email}, process.env.JWT_SECRET);
        res.json({
            token,
            message: "User saved successfully!"
        })
    }
    catch(err){
        console.log('error saving user --->',err);
        res.status(500).json({message: 'Sign-in Error!'});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userData.findOne({email});
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        const verify = await bcrypt.compare(password, user.password);
        if(!verify){
            return res.status(401).json({message: 'Not authorized'});
        }
        res.status(200).json({
            user: {email},
            message: 'Authenticated!'
        })
    }
    catch(err){
        res.status(500).json({message: 'Internal server error!'});
    }
})

module.exports = router;