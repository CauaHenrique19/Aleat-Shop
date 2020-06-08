var categorias = []
var produtos = []
var produtoId = {}
var produtosCategoria = []
let carrinho = []

var parametros = new URL(document.location).searchParams
var id = parametros.get('id')

function pegarProdutos() {

    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest()
        ajax.open('GET', `/produto`)

        ajax.send()

        ajax.onload = event => {
            produtos = JSON.parse(ajax.responseText)
            encontrarProdutoId(produtos)
        }
        ajax.onerror = event => {
            reject(event)
        }
    })
}

function pegarCategorias() {
    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest()
        ajax.open('GET', '/categoria')

        ajax.send()

        ajax.onload = event => {
            categorias = JSON.parse(ajax.responseText)
        }
        ajax.onerror = event => {
            reject(event)
        }
    })
}

let promise = []

function executarPromise() {
    promise.push(pegarProdutos())
    promise.push(pegarCategorias())

    return Promise.all(promise)
}
executarPromise()
function encontrarProdutoId(produtos) {
    produtoId = produtos.find((produto) => produto.id == id)
    produtoId.quantidade = 1

    document.title = produtoId.nome
    encontrarProdutosCategoria(produtoId.categoriaNome, produtos, produtoId)
    exibirProduto(produtoId)
    addCarrinho(produtoId)

}
function encontrarProdutosCategoria(categoria, produtos, produtoId) {

    produtosCategoria = produtos.filter((produto) => produto.categoriaNome == categoria && produto.nome !== produtoId.nome)
    exibirMaisOfertas(produtosCategoria)

}
function exibirProduto(produto) {
    const imgProduto = document.querySelector('.imagem')
    imgProduto.src = produto.imagemUrl

    const nomeProduto = document.querySelector('.nome')
    nomeProduto.innerHTML = produto.nome

    const descricaoProduto = document.querySelector('.descricao')
    descricaoProduto.innerHTML = produto.descricao

    const precoProduto = document.querySelector('.preco')
    precoProduto.innerHTML = `R$ ${produto.preco}`

    const parcelas = document.querySelector('.parcelas')
    parcelas.innerHTML = `12x R$ ${(produto.preco / 12).toFixed(2)} sem juros`
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
            window.location.href = `/produtoId?id=${produtoId}`

        })
    })
}

function addCarrinho(produtoId) {
    enumerarCarrinho()
    carregarCarrinho(carrinho)

    document.querySelector('.add-carrinho').addEventListener('click', e => {

        var quantidade = document.querySelector('.quantidade').value
        produtoId.quantidade = quantidade

        const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho'))

        if (carrinhoStorage != null) {
            carrinho = [...carrinhoStorage]
        }

        carrinho.push(produtoId)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))

        carregarCarrinho(carrinho)
        enumerarCarrinho()
    })
}
