const knex = require('../database/connection')

class Categories {
    async create(req, res) {
        const category = { ...req.body }
        if(!category.nome) return res.json({ error: true, message: 'Nome da categoria não informado!' })

        knex('categorias')
            .insert(category, '*')
            .then(returnedCategory => res.json({ message: 'Categoria criada com sucesso!', category: returnedCategory[0] }))
            .catch(err => res.status(500).send(err))
        }
    index(req, res) {

        req.app.io.emit('leo', { message: true })

        knex('categorias')
            .select('id', 'nome')
            .whereNull('deletadoEm')
            .orderBy('id', 'asc')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }
    show(req, res) {
        knex('categorias')
            .select('id', 'nome')
            .where({ id: req.params.id })
            .whereNull('deletadoEm')
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }
    update(req, res) {
        const category = { ...req.body }

        knex('categorias')
            .update(category)
            .where('id', req.params.id)
            .whereNull('deletadoEm')
            .then(() => res.json({ message: 'Categoria atualizada com sucesso!' }))
            .catch(err => res.status(500).send(err))
    }
    async delete(req, res) {

        const linhasAtualizadas = await knex('categorias')
            .update({ deletadoEm: new Date() })
            .where({ id: req.params.id })

        if(!linhasAtualizadas) return res.json({ error: true, message: 'Categoria não encontrada!' })
        res.json({ message: 'Categoria excluída com sucesso!' })

    }
}

module.exports = Categories
