let Produto = {}
let ProdutosCategoria = []
let carrinho = []

var parametros = new URL(document.location).searchParams
let id = parseInt(parametros.get('id'))

function encontrarProdutoId(id) {
    
    fetch(`http://localhost:3001/produtos/${id}`)
    .then(res => res.json())
    .then(data => {
        Produto = data[0]
        pegarProdutosPorCategoria(Produto.categoriaId)
        exibirProduto(Produto)
        Produto.quantidade = 1
        document.title = Produto.nome
        addCarrinho(Produto)
        return Produto
    })
}

encontrarProdutoId(id)

function pegarProdutosPorCategoria(categoryId){
    fetch(`http://localhost:3001/produtos-por-categoria/${categoryId}`)
        .then(res => res.json())
        .then(data => {
            ProdutosCategoria.push(...data)
            exibirMaisOfertas(ProdutosCategoria)
            return ProdutosCategoria
        })
}

function exibirProduto(produto) {
    document.querySelector('.imagem').src = produto.imagemUrl
    document.querySelector('.nome').innerHTML = produto.nome
    document.querySelector('.descricao').innerHTML = produto.descricao
    document.querySelector('.preco').innerHTML = `R$ ${produto.preco}`
    document.querySelector('.parcelas').innerHTML = `12x R$ ${(produto.preco / 12).toFixed(2)} sem juros`
}

function exibirMaisOfertas(produtosCategoria) {

    const local = document.querySelector('.ofertas')

    if(produtosCategoria.length !== 0){
        local.innerHTML = produtosCategoria.map((produto) =>
            `<div class="oferta" data-produtoId="${produto.id}">
                <div class="oferta-img">
                    <img src="${produto.imagemUrl}" alt="">
                </div>
                <div class="oferta-info">
                    <h2>R$ ${produto.preco}</h2>
                    <p class="produtoCategoria">${produto.categoriaNome}</p>
                    <p>${produto.nome.substr(0, 45) + '...'}</p>
                </div>
            </div>`
        ).join('')
    }
    else{
        local.innerHTML = 'Nenhum produto relacionado encontrado!'
    }

    document.querySelectorAll('.oferta').forEach((oferta) => {
        oferta.addEventListener('click', e => {
            const produtoId = oferta.dataset.produtoid
            window.location.href = `/produto?id=${produtoId}`
        })
    })
}

function addCarrinho(produtoId) {

    carregarCarrinho()

    document.querySelector('.add-carrinho').addEventListener('click', e => {
        produtoId.quantidade = document.querySelector('.quantidade').value
        const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho'))

        if (carrinhoStorage) {
            carrinho = [...carrinhoStorage]
        }

        carrinho.push(produtoId)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))

        carregarCarrinho()
    })
}
