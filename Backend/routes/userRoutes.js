const express = require('express')
const User = require('../models/user')

const router = express.Router()

//User SignOn
router.post('/user', async (req, res) => {
    try{
        const {name, email, passoword, bio, age} = req.body
        const newUser = new User({name, email, passoword, bio, age})
        await newUser.save()
        res.status(201).json(newUser)
    }catch(error){
        res.status(500).json({ error: 'Erro ao cadastrar usuário.'})
    }
})

//User SignIn
router.get('/user/email/password', async (req, res) => {
    try {
        const user = await User.find();
        
    } catch (error) {
        
    }
})