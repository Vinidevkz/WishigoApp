const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(bodyParser.json());

//database connection
mongoose.connect('mongodb://localhost:27017/Wishigo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro de Conexão com o Banco de Dados: '))
db.once('open', () => {
    console.log('Conectado ao MongoDB')
})

//routes
app.get('/', (req, res) => {
    res.send('Backend funcionando')
})

//start server
app.listen(port, () => {
    console.log(`• Wishigo Server is Running. => Localhost Port: ${port}`)
})