module.exports = (app, io) => {
    const { existeOuErro, naoExisteOuErro } = app.api.validacao

    const salvar = async (req, res) => {

        const categoria = { ...req.body }

        if (req.params.id) categoria.id = req.params.id

        try {
            existeOuErro(categoria.nome, 'Nome não informado')

            const categoriaFromDb = await app.db('categorias')
                .whereNull('deletadoEm')
                .where({ id: req.params.id })

            if (!categoria.id) {
                naoExisteOuErro(categoriaFromDb, 'Categoria Já cadastrada')
            }
        }
        catch (msg) {

        }
        if (categoria.id) {
            app.db('categorias')
                .update(categoria)
                .where({ id: categoria.id })
                .whereNull('deletadoEm')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else {
            await app.db('categorias')
                .insert(categoria)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

            io.emit('quantidade-categorias', {message: 'Categoria Criada'})
        }
    }
    const pegar = (req, res) => {
        app.db('categorias')
            .select('id', 'nome')
            .whereNull('deletadoEm')
            .orderBy('id', 'asc')
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500).send(err))
    }
    const pegarPorId = (req, res) => {
        app.db('categorias')
            .select('id', 'nome')
            .where({ id: req.params.id })
            .whereNull('deletadoEm')
            .then(categoria => res.json(categoria))
            .catch(err => res.status(500).send(err))
    }
    const pegarQuantidades = (req, res) => {
        app.db('categorias')
            .count('id', { as: 'quantidade' })
            .whereNull('deletadoEm')
            .then((quant) => res.json(quant))
            .catch(err => res.status(500).send(err))
    }
    const remover = async (req, res) => {
        try {
            const linhasAtualizadas = await app.db('categorias')
                .update({ deletadoEm: new Date() })
                .where({ id: req.params.id })
            existeOuErro(linhasAtualizadas, 'Categoria não encontrada')

            io.emit('quantidade-categorias', {message: 'Categoria Excluida'})

            res.status(204).send()
        }
        catch (msg) {
            res.status(500).send(msg)
        }
    }

    return { salvar, pegar, pegarPorId, pegarQuantidades, remover }
}