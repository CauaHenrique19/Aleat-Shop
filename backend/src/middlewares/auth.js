const jwt = require('jsonwebtoken')
require("dotenv-safe").config();

module.exports = middleware => {
    return (req, res, next) => {
        if(req.headers.token){
            jwt.verify(req.headers.token, process.env.SECRET, (error, encoded) => {
                if(error){
                    return res.json({ error: true, message: 'Token Inválido!' })
                }
                else{
                    middleware(req, res, next)
                }
            })
        }
        else{
            res.json({ error: true, message: 'Usuário não está autenticado!' })
        }
    }
}