const knex = require('../database/connection')

module.exports = middleware => {
    return async (req, res, next) => {
        if (req.headers.admin) {
            const isAdmin = await knex('users')
                .select('admin')
                .where('id', req.headers.user_id)
                .first()

            if (isAdmin.admin) {
                middleware(req, res, next)
            }
            else {
                res.send({ error: true, message: 'Usuário não é administrador!' })
            }
        }
        else{
            res.send({ error: true, message: 'Usuário não tem essa permissão!' })
        }
    }
}