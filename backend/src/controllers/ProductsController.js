const knex = require('../database/connection')

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
    index(req, res){
        knex('produtos')
            .select('produtos.id', 'produtos.nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId', 'categorias.nome as categoriaNome')
            .whereNull('produtos.deletadoEm')
            .innerJoin('categorias', 'produtos.categoriaId', '=', 'categorias.id')
            .orderBy('produtos.id')
        .then(products =>  res.json(products))
        .catch(err => res.status(400).send(err.message))
    }
    show(req, res){
        knex('produtos')
            .select('produtos.id', 'produtos.nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId', 'categorias.nome as categoriaNome')
            .innerJoin('categorias', 'produtos.categoriaId', '=', 'categorias.id')
            .where('produtos.id', req.params.id)
            .whereNull('produtos.deletadoEm')
        .then(product => res.json(product))
        .catch(err => res.status(400).send(err))
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

module.exports = Products