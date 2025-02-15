const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express()
const port = process.env.PORT || 5000

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

//middleware
app.use(cors())
app.use(bodyParser.json());

//database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de Conexão com o Banco de Dados:', err));


const db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro de Conexão com o Banco de Dados: '))
db.once('open', () => {
    console.log('Conectado ao MongoDB')
})

//routes
app.use('/user', userRoutes)
app.use('/tasks', taskRoutes)

//start server
app.listen(port, () => {
    console.log(`• Wishigo Server is Running. => Localhost Port: ${port}`)
})