const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userData = require('../models/user');

const router = express.Router();

router.post('/signin', async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const exists = await userData.findOne({email});
        if(exists){
            console.log('User already exists!')
            return res.status(500).json({message: 'User already exists!'})
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = userData.create({
            name: name,
            email: email,
            password: hashed
        })
        const token = jwt.sign({name, email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            token,
            message: "User saved successfully!"
        })
    }
    catch(err){
        console.log('error here --->',err)
        return res.status(500).json({message: 'Sign-in Error!'});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userData.findOne({email});
        if(!user){
            console.log('User Dont exist!!!')
            return res.status(400).json({message: 'User does not exist'});
        }
        const verify = await bcrypt.compare(password, user.password);
        if(!verify){
            console.log('User not authorized!!')
            return res.status(401).json({message: 'Not authorized'});
        }
        const token = jwt.sign(
            {name: user.name, email: user.email}, 
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        );
        res.status(200).json({
            user: {name: user.name, email: user.email},
            token: token,
            message: 'Authenticated!'
        })
    }
    catch(err){
        console.log('Errorrr here',err)
        return res.status(500).json({message: 'Internal server error!'});
    }
})

module.exports = router;