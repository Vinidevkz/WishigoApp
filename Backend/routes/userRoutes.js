const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

//models
const User = require('../models/user')


const router = express.Router()

//User Routes
    //User SignOn
    router.post('/signon', async (req, res) => {
        try{
            const {name, email, password, age} = req.body

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({name, email, password: hashedPassword, age})
            await newUser.save()
            res.status(201).json(newUser)
        }catch(error){
            res.status(500).json({ error: 'Erro ao cadastrar usuário.'})
        }
    })

    //User SignIn
    router.post('/signin', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado. Verifique suas informações." });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) {
                return res.status(401).json({ message: "Senha incorreta. Verifique suas informações e tente novamente."})
            }

            const token = jwt.sign(
                {id: user._id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: '24h'}
            )

            res.status(200).json({user, token});
        } catch (error) {
            console.error("Erro no login:", error); 
            res.status(500).json({ error: error.message });
        }
        
    });



module.exports = router