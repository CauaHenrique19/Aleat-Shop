module.exports = app => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {
        
        const produto = {...req.body}

        if(req.params.id) produto.id = req.params.id

        try{
            existeOuErro(produto.nome, 'Nome não informado')
            existeOuErro(produto.preco, 'Preço não informado')
            existeOuErro(produto.descricao, 'Descrição não informada')
            existeOuErro(produto.imagemUrl, 'Url da imagem não informada')
            existeOuErro(produto.categoriaId, 'Categoria não informada')

            const produtoFromDb = await app.db('produtos')
                .whereNull('deletadoEm')
                .where({ id: produto.id }).first()

            if(!produto.id){
                naoExisteOuErro(produtoFromDb, 'Produto Já cadastrado')
            }
        }
        catch(msg){

        }
        if(produto.id){
            app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
                .whereNull('deletadoEm')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else {
            app.db('produtos')
                .insert(produto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const pegar = async (req, res) => {
        const nomesCategorias = await app.db('categorias')
            .select('id', 'nome')
            .whereNull('deletadoEm')

        app.db('produtos')
            .select('id', 'nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId')
            .whereNull('deletadoEm')
            .then((produtos) => {
                produtos.map((produto) => {
                    const nomeCategoria = nomesCategorias.find((categoria) => categoria.id == produto.categoriaId)
                    produto.categoriaNome = nomeCategoria.nome
                    delete produto.categoriaId
                })
                res.json(produtos)
            })
            .catch(err => res.status(500).send(err))
    }
    const pegarPorId = async (req, res) => {
        const nomesCategorias = await app.db('categorias')
            .select('id', 'nome')
            .whereNull('deletadoEm')

        app.db('produtos')
            .select('id', 'nome', 'preco', 'descricao', 'imagemUrl', 'categoriaId')
            .where({ id: req.params.id })
            .whereNull('deletadoEm')
            .then(produto => { 
                produto.map((produto) => {
                    const nomeCategoria = nomesCategorias.find((categoria) => categoria.id == produto.categoriaId)
                    produto.categoriaNome = nomeCategoria.nome
                    delete produto.categoriaId
                })
                res.json(produto)
            })
            .catch(err => res.status(500).send(err))
    }
    const remover = async (req, res) => {
        try {
            const linhasAtualizadas = await app.db('produtos')
                .update({ deletadoEm: new Date() })
                .where({ id: req.params.id })
            existeOuErro(linhasAtualizadas, 'Produto não encontrado')

            res.status(204).send()
        }
        catch(msg){
            res.status(500).send(msg)
        }
    }


    return { salvar, pegar, pegarPorId, remover }
}