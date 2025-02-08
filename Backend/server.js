const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

const userRoutes = require('./routes/userRoutes')

//middleware
app.use(cors())
app.use(bodyParser.json());

//database connection
mongoose.connect('mongodb://127.0.0.1:27017/Wishigo')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de Conexão com o Banco de Dados:', err));


const db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro de Conexão com o Banco de Dados: '))
db.once('open', () => {
    console.log('Conectado ao MongoDB')
})

//routes
app.use('/user', userRoutes)

//start server
app.listen(port, () => {
    console.log(`• Wishigo Server is Running. => Localhost Port: ${port}`)
})