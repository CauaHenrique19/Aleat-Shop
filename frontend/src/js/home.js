let Produtos = []
let Categorias = []
let carrinho = []

const localCategorias = document.querySelector('.categorias')
const localOfertas = document.querySelector('.ofertas')

fetch('http://localhost:3001/produtos')
    .then(res => res.json())
    .then(data => {
        Produtos.push(...data)
        
        gerarProdutos()
        carregarCarrinho()

        return Produtos
    })

fetch('http://localhost:3001/categorias')
    .then(res => res.json())
    .then(data => {
        Categorias.push(...data)
        gerarCategorias()

        return Categorias
    })
    
function renderizarFilter(categoria) {
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
        localOfertas.innerHTML = ''
        gerarProdutos(Produtos)
    })
}

function gerarCategorias() {
    let icon = [
        '<i class="fas fa-desktop"></i>',
        '<i class="fas fa-headset"></i>',
        '<i class="fas fa-sticky-note"></i>',
        '<i class="fas fa-drumstick-bite"></i>',
        '<i class="fas fa-star"></i>',
        '<i class="fas fa-birthday-cake"></i>',
        '<i class="fas fa-car"></i>',
        '<i class="fas fa-gamepad"></i>',
        '<i class="fas fa-tshirt"></i>']

    localCategorias.innerHTML = Categorias.map((categoria, indice) =>
        `<div class="categoria" data-indice="${categoria.id}">
            <div class="categoria-icon">${icon[indice]}</div>
            <div class="categoria-nome">${categoria.nome}</div>
        </div>`).join('')

    document.querySelectorAll('.categoria').forEach((categoria) => {
        categoria.addEventListener('click', e => {
            let indice = parseInt(categoria.dataset.indice)
            
            const categoriaCorrespondente = Categorias.find((categoria) => categoria.id === indice)
            let produtosCategoria = Produtos.filter((produto) => produto.categoriaId === categoriaCorrespondente.id)

            localOfertas.innerHTML = ''
            gerarProdutos(produtosCategoria)
            renderizarFilter(categoriaCorrespondente)
        })
    })
}

function gerarProdutos(produtos) {
    let generatedProducts = produtos ? produtos : Produtos

    localOfertas.innerHTML = generatedProducts.map((produto) =>
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
            const produtoId = parseInt(oferta.dataset.produtoid)
            window.location.href = `/produto?id=${produtoId}`
        })
    })
}