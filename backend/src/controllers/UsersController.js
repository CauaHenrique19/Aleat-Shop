const knex = require('../database/connection')
const bcrypt = require('bcrypt')
require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

class Users {
    create(req, res) {
        const { email, name, password, confirmPassword, admin } = req.body

        if (!email) return res.json({ message: 'E-mail não informado!' })
        if (!name) return res.json({ message: 'Nome não informado!' })
        if (!password) return res.json({ message: 'Senha não informada!' })
        if (!confirmPassword) return res.json({ message: 'Confirmação de senha não informada!' })
        if (password !== confirmPassword) return res.json({ message: 'Senhas não conferem!' })

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = {
            email,
            name,
            password: hash,
            admin: admin ? admin : false
        }

        knex('users')
            .insert(user)
            .then(() => res.json({ message: 'Usuário cadastrado com sucesso!' }))
            .catch(error => console.log(error))
    }
    async login(req, res){
        const { email, password } = req.body

        if (!email) return res.json({ message: 'E-mail não informado!' })
        if (!password) return res.json({ message: 'Senha não informada!' })

        const userInDB = await knex('users')
            .select('*')
            .where('email', email)
            .first()

        if(!userInDB){
            return res.json({ error: true, message: 'Usuário não encontrado!' })
        }
        else{
            if(bcrypt.compareSync(password, userInDB.password)){
                delete userInDB.password
                const token = jwt.sign({ id: userInDB.id }, process.env.SECRET)

                res.json({ auth: true, token, user: userInDB })
            }
            else{
                res.json({ error: true, message: 'Senhas informadas não conferem!' })
            }
        }
    }
}

module.exports = Users;