const knex = require('../database/connection')

const aws = require('aws-sdk')
const s3 = new aws.S3()

class Products{
    async salvar(req, res){

        const product = { ...req.body }

        if(!product.nome) return res.json({ error: true, message: 'Nome não informado!' })
        if(!product.preco) return res.json({ error: true, message: 'Preço não informado!' })
        if(!product.descricao) return res.json({ error: true, message: 'Descrição não informada!' })
        if(!product.imagemUrl) return res.json({ error: true, message: 'Imagem não informada!' })
        if(!product.categoriaId) return res.json({ error: true, message: 'Categoria não informada!' })

        const categoryName = await knex('categorias')
            .select('nome')
            .where('id', product.categoriaId)
            .whereNull('deletadoEm')

        knex('produtos')
            .insert(product, '*')
            .then(returnedProduct => {
                returnedProduct[0].categoriaNome = categoryName[0].nome
                res.json({ message : 'Produto cadastrado com sucesso!', product: returnedProduct[0] })
            })
            .catch(err => res.status(500).send(err))

        //io.emit('quantidade-produtos', { quantProdutos })
    }
    async index(req, res){
        try{
            const products = await knex('products')
                .select('products.id', 'products.name', 'products.price',
                        'products.description', 'products.key_image', 'products.image_url',
                        'products.category_id', 'categories.name as category_name', 'categories.color as category_color',
                        'categories.icon as category_icon')
                .join('categories', 'categories.id', 'products.category_id')
                .orderBy('products.id')
            res.json(products)
        }
        catch(error){
            return res.status(500).json({ error: error.message })
        }
    }
    async show(req, res){
        try{
            const id = req.params.id

            const product = await knex('products')
                .select('products.id', 'products.name', 'products.price',
                        'products.description', 'products.key_image', 'products.image_url',
                        'products.category_id', 'categories.name as category_name', 'categories.color as category_color',
                        'categories.icon as category_icon')
                .join('categories', 'categories.id', 'products.category_id')
                .where('products.id', id)
                .orderBy('products.id')

            res.json(product)
        }
        catch(error){
            return res.status(500).json({ error: error.message })
        }
    }
    indexByCategories(req, res){
        knex('produtos')
            .select('produtos.id', 'produtos.nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId', 'categorias.nome as categoriaNome')
            .where('produtos.categoriaId', req.params.categoryId)
            .whereNull('produtos.deletadoEm')
            .innerJoin('categorias', 'produtos.categoriaId', '=', 'categorias.id')
            .orderBy('produtos.id')
        .then(products =>  res.json(products))
        .catch(err => res.status(400).send(err.message))
    }
    update(req, res){
        const product = { ...req.body }

        if(!product.nome) return res.json({ error: true, message: 'Nome não informado!' })
        if(!product.preco) return res.json({ error: true, message: 'Preço não informado!' })
        if(!product.descricao) return res.json({ error: true, message: 'Descrição não informada!' })
        if(!product.imagemUrl) return res.json({ error: true, message: 'Imagem não informada!' })
        if(!product.categoriaId) return res.json({ error: true, message: 'Categoria não informada!' })

        knex('produtos')
            .update(product)
            .where('id', req.params.id)
            .then(() =>  res.json({ message: 'Produto Atualizado com sucesso!' }))
            .catch(err => res.status(400).send(err.message))
    }
    async remover(req, res){

        const linhasAtualizadas = await knex('produtos')
            .update({ deletadoEm: new Date() })
            .where({ id: req.params.id })

        if(!linhasAtualizadas) return res.json({ error: true, message: 'Produto não encontrado!' })
        res.json({ message: 'Produto excluído com sucesso!' })

        //io.emit('quantidade-produtos', { quantProdutos })
    }
}

module.exports = new Products()