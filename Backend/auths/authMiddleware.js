//importando a lib de tokens e colocando ela dentro do jwt
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    //separa o header pegando apenas o token
    const token = req.header.authorization?.split(' ')[1]

    //se o token for nulo/vazio, retorna uma mensage, de token nao fornecido
    if (!token){
        return res.status(401).json({message: "Token não fornecido."})
    }

    try {
    //converte o id do usuario recebido em um token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //e devolve ele
        req.user = decoded
        next()
    } catch (error) {
    //se o token não for válido, retorna um erro
        return res.status(401).json({error: 'Token inválido.'})
    }
}

module.exports = authMiddleware