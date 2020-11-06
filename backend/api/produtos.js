module.exports = (app, io) => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {

        const produto = { ...req.body }

        if (req.params.id) produto.id = req.params.id

        try {
            existeOuErro(produto.nome, 'Nome não informado')
            existeOuErro(produto.preco, 'Preço não informado')
            existeOuErro(produto.descricao, 'Descrição não informada')
            existeOuErro(produto.imagemUrl, 'Url da imagem não informada')
            existeOuErro(produto.categoriaId, 'Categoria não informada')

            const produtoFromDb = await app.db('produtos')
                .whereNull('deletadoEm')
                .where({ id: produto.id })
                .first()

            if (!produto.id) {
                naoExisteOuErro(produtoFromDb, 'Produto Já cadastrado')
            }
        }
        catch (msg) {

        }
        if (produto.id) {
            app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
                .whereNull('deletadoEm')
                .then(() => res.json({ message : 'Produto atualizado com sucesso!' }))
                .catch(err => res.status(500).send(err))
        }
        else {
            const nomeCategoria = await app.db('categorias')
                .select('nome')
                .where('id', produto.categoriaId)
                .whereNull('deletadoEm')

            app.db('produtos')
                .insert(produto)
                .returning('id')
                .then((id) => {
                    produto.id = id[0]
                    produto.categoriaNome = nomeCategoria[0].nome
                    res.json({ message : 'Produto cadastrado com sucesso!', produto })
                })
                .catch(err => res.status(500).send(err))

            const quantProdutos = await app.db('produtos')
                .count('id', { as: 'quantidade' })
                .whereNull('deletadoEm')

            io.emit('quantidade-produtos', { quantProdutos })
        }
    }
    const pegar = (req, res) => {
        app.db('produtos')
            .select('produtos.id', 'produtos.nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId', 'categorias.nome as categoriaNome')
            .whereNull('produtos.deletadoEm')
            .innerJoin('categorias', 'produtos.categoriaId', '=', 'categorias.id')
            .orderBy('produtos.id')
        .then(produtos =>  res.json(produtos))
        .catch(err => res.status(400).send(err.message))
    }
    const pegarPorId = (req, res) => {
        app.db('produtos')
            .select('produtos.id', 'produtos.nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId', 'categorias.nome as categoriaNome')
            .innerJoin('categorias', 'produtos.categoriaId', '=', 'categorias.id')
            .where('produtos.id', req.params.id)
            .whereNull('produtos.deletadoEm')
        .then(produto => res.json(produto))
        .catch(err => res.status(400).send(err))
    }
    const pegarPorCategorias = (req, res) => {
        app.db('produtos')
            .select('produtos.id', 'produtos.nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId', 'categorias.nome as categoriaNome')
            .where('produtos.categoriaId', req.params.categoriaId)
            .whereNull('produtos.deletadoEm')
            .innerJoin('categorias', 'produtos.categoriaId', '=', 'categorias.id')
            .orderBy('produtos.id')
        .then(produtos =>  res.json(produtos))
        .catch(err => res.status(400).send(err.message))
    }
    const pegarQuantidades = (req, res) => {
        app.db('produtos')
            .count('id', { as: 'quantidade' })
            .whereNull('deletadoEm')
            .then((quant) => res.json(quant))
            .catch(err => res.status(500).send(err))
    }
    const remover = async (req, res) => {
        try {
            const linhasAtualizadas = await app.db('produtos')
                .update({ deletadoEm: new Date() })
                .where({ id: req.params.id })
            existeOuErro(linhasAtualizadas, 'Produto não encontrado')

            const quantProdutos = await app.db('produtos')
                .count('id', { as: 'quantidade' })
                .whereNull('deletadoEm')

            io.emit('quantidade-produtos', { quantProdutos })

            res.json({ message: 'Produto excluído com sucesso!' })
        }
        catch (msg) {
            res.status(500).send(msg)
        }
    }

    return { salvar, pegar, pegarPorId, remover, pegarQuantidades, pegarPorCategorias }
}