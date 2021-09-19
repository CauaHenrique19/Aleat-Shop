const knex = require('../database/connection')

class Categories {
    async create(req, res) {
        try{
            const { name, icon, color } = req.body
    
            const category = {
                name,
                icon,
                color
            }
    
            if(!category.name) return res.json({ error: true, message: 'Nome da categoria não informado!' })
            if(!category.icon) return res.json({ error: true, message: 'Cor da categoria não informado!' })
            if(!category.color) return res.json({ error: true, message: 'Icone da categoria não informado!' })
    
            const categoryDb = await knex('categories')
                .insert(category, '*')
                
            return res.json(categoryDb)
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao criar categoria!', error: error.message })
        }
    }
    async index(req, res) {
        try{
            //req.app.io.emit('leo', { message: true })
    
            const categories = await knex('categories')
                .select('*')
                .orderBy('id')
    
            return res.json(categories)
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao buscar categorias!', error: error.message })
        }
    }
    async show(req, res) {
        try{
            const id = req.params.id
            
            const category = await knex('categorias')
                .select('*')
                .where({ id })
                .first()

            return res.json(category)
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado ao buscar categoria específica!', error: error.message })
        }
    }
    async update(req, res) {
        try{
            const id = req.params.id
            const { name, color, icon } = req.body
    
            const category = {
                name,
                color,
                icon
            }
    
            const updatedCategory = await knex('categories')
                .update(category, '*')
                .where({ id })

            return res.json(updatedCategory)
        }
        catch(error){
            return res.json({ message: 'Ocorreu um erro inesperado ao atualizar categoria', error: error.message })
        }
    }
    async delete(req, res) {
        const id = req.params.id

        knex('categories')
            .delete()
            .where({ id })
            .then(_ => res.json({ message: 'Categoria excluída com sucesso!' }))
            .catch(error => res.status(500).json({ message: 'Ocorreu um erro inesperado ao deletar categoria', error: error.message }) )
    }
}

module.exports = new Categories()