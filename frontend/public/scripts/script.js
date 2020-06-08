var objProdutos = []
var objCategorias = []
var carrinho = []

function pegarCategorias() {

    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest()

        ajax.open('GET', '/categoria')

        ajax.onload = event => {
            objCategorias = JSON.parse(ajax.responseText)
            gerarCategorias(objCategorias)
        }

        ajax.onerror = event => {
            reject(event)
        }

        ajax.send()
    })
}

function pegarProdutos() {

    return new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest()

        ajax.open('GET', '/produto')

        ajax.onload = event => {
            objProdutos = JSON.parse(ajax.responseText)
            gerarProdutos(objProdutos)
            enumerarCarrinho(objProdutos)
        }

        ajax.onerror = event => {
            reject(event)
        }

        ajax.send()

    })
}

let promises = []

function executarPromises() {
    promises.push(pegarCategorias())
    promises.push(pegarProdutos())

    return Promise.all(promises)
}
executarPromises()

function renderizarFilter(categoria, local, produtos) {
    var localCategoriaFilter = document.querySelector('.categoria-filter')
    localCategoriaFilter.innerHTML = ''

    const div = document.createElement('div')
    div.classList.add('categoria-item')
    div.innerHTML = `
        <p>${categoria.nome}</p>
        <i class="fas fa-times fechar-categoria"></i>`

    localCategoriaFilter.appendChild(div)

    div.querySelector('.fechar-categoria').addEventListener('click', e => {
        localCategoriaFilter.innerHTML = ''
        local.innerHTML = ''
        gerarProdutos(produtos)
    })
}

function gerarCategorias(objCategorias) {
    const local = document.querySelector('.categorias')

    var icon = [
        '<i class="fas fa-desktop"></i>',
        '<i class="fas fa-headset"></i>',
        '<i class="fas fa-sticky-note"></i>',
        '<i class="fas fa-drumstick-bite"></i>',
        '<i class="fas fa-star"></i>',
        '<i class="fas fa-birthday-cake"></i>',
        '<i class="fas fa-car"></i>',
        '<i class="fas fa-gamepad"></i>',
        '<i class="fas fa-tshirt"></i>']

    local.innerHTML = objCategorias.map((categoria, indice) =>
        `<div class="categoria" data-indice="${categoria.id}">
            <div class="categoria-icon">${icon[indice]}</div>
            <div class="categoria-nome">${categoria.nome}</div>
        </div>`).join('')

    document.querySelectorAll('.categoria').forEach((categoria) => {

        categoria.addEventListener('click', e => {
            var produtosCategoria = []
            var indice = JSON.parse(categoria.dataset.indice)

            const objCategoria = objCategorias.find((objcategoria) => objcategoria.id === indice)
            produtosCategoria = objProdutos.filter((produto) => produto.categoriaNome === objCategoria.nome)

            const local = document.querySelector('.ofertas')
            local.innerHTML = ''

            gerarProdutos(produtosCategoria)
            renderizarFilter(objCategoria, local, objProdutos)
        })
    })
}

function gerarProdutos(objProdutos) {
    const local = document.querySelector('.ofertas')

    local.innerHTML = objProdutos.map((produto) =>
    `<div class="oferta" data-categoria="${produto.categoriaId}" data-produtoId="${produto.id}">
        <div class="oferta-img">
            <img src="${produto.imagemUrl}" alt="">
        </div>
        <div class="oferta-info">
            <h2>R$ ${produto.preco}</h2>
            <p class="produtoCategoria">${produto.categoriaNome}</p>
            <p>${produto.nome.substr(0, 45) + '...'}</p>
        </div>
    </div>`).join('')

    document.querySelectorAll('.oferta').forEach((oferta) => {
        oferta.addEventListener('click', e => {

            const produtoId = oferta.dataset.produtoid
            window.location.href = `/produtoId?id=${produtoId}`

        })
    })
}