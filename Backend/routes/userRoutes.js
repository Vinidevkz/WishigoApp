const express = require('express');
const User = require('../models/user')

const router = express.Router()

//User SignOn
router.post('/signon', async (req, res) => {
    try{
        const {name, email, password, age} = req.body
        const newUser = new User({name, email, password, age})
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

        if(user.password !== password) {
            return res.status(401).json({ message: "Senha incorreta. Verifique suas informações e tente novamente."})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor. Aguarde alguns minutos e tente novamente.' });
    }
});

module.exports = router