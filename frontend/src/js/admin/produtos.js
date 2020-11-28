let Produtos = []
let Categorias = []

fetch('http://localhost:3001/categorias')
    .then((res) => res.json())
    .then(data => Categorias.push(...data))

fetch('http://localhost:3001/produtos')
    .then((res) => res.json())
    .then(data => {
        Produtos.push(...data)
        gerarOpcoesCategorias(Categorias)
        gerarCategorias(Categorias, Produtos)

        renderizarProdutos(Produtos)
        organizarProdutos(Produtos)
        pesquisa(Produtos)
        precoRange(Produtos)
    })

const localProdutos = document.querySelector('.ofertas')

function renderizarProdutos(obj) {
    localProdutos.innerHTML = obj.map((produto) =>
        `<div class="oferta" data-indice="${produto.id}">
            <div class="oferta-img">
                <img src="${produto.imagemUrl}" alt="">
            </div>
            <div class="oferta-info">
                <h2>R$ ${produto.preco}</h2>
                <p class="produtoCategoria">${produto.categoriaNome}</p>
                <p>${produto.nome.substr(0, 45) + '...'}</p>
            </div>
            <div class="oferta-botoes">
                <button class="editar-oferta" data-indice="${produto.id}">
                    <ion-icon class="icon" name="pencil-sharp"></ion-icon>
                    Editar
                </button>
                <button class="remover-oferta" data-indice="${produto.id}">
                    <ion-icon class="icon" name="trash-outline"></ion-icon>
                    Remover
                </button>
            </div>
        </div>`).join('')

    document.querySelectorAll('.editar-oferta').forEach((btn) => {
        btn.addEventListener('click', e => {
            const index = parseInt(btn.dataset.indice)
            const produto = obj.find((produto) => produto.id == index)

            const form = document.querySelector('.form')
            form.id.value = produto.id
            form.nome.value = produto.nome
            form.preco.value = produto.preco
            form.imagemUrl.value = produto.imagemUrl
            form.categoriaId.value = produto.categoriaId
            form.descricao.value = produto.descricao
            form.categoriaNome.value = produto.categoriaNome
        })
    })
    document.querySelectorAll('.remover-oferta').forEach((btn) => {
        btn.addEventListener('click', e => {
            const index = parseInt(e.target.dataset.indice)
            const produto = obj.find(produto => produto.id == index)

            excluirProduto(produto.id)

            const oferta = document.querySelector(`[data-indice="${produto.id}"]`)
            const local = document.querySelector('.ofertas')

            local.removeChild(oferta)
        })
    })
}

function gerarOpcoesCategorias(obj) {
    const select = document.querySelector('select')
    select.innerHTML += obj.map((categoria) => `<option value="${categoria.id}">${categoria.id} - ${categoria.nome}</option>`)
}

function gerarCategorias(categorias, produtos) {
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

    const localCategorias = document.querySelector('.categorias')
    localCategorias.innerHTML = categorias.map((categoria, indice) =>
        `<div class="categoria">
            <div class="categoria-info" data-categoriaId="${categoria.id}">
                ${icon[indice]}
                ${categoria.nome}
            </div>
            <i class="fas fa-times remover-categoria"></i>
        </div>`).join('')

    document.querySelectorAll('.categoria-info').forEach((categoria) => {
        categoria.addEventListener('click', e => {

            const id = categoria.dataset.categoriaid
            const categoriaProduto = categorias.find((categoria) => categoria.id == id)
            const produtosCategoria = produtos.filter((produto) => produto.categoriaNome == categoriaProduto.nome)

            renderizarProdutos(produtosCategoria)
        })
    })
    document.querySelectorAll('.remover-categoria').forEach((btn) => {
        btn.addEventListener('click', e => {
            renderizarProdutos(produtos)
        })
    })
}

function pesquisa(produtos) {
    const input = document.querySelector('.input-pesquisa')
    input.addEventListener('keyup', e => {
        var pesquisa = e.target.value.toLowerCase()
        var produtosCorrespondentes = produtos.filter((produto) => produto.nome.toLowerCase().includes(pesquisa))
        renderizarProdutos(produtosCorrespondentes)
    })
}

function precoRange(produtos) {
    const inputRange = document.querySelector('#range')

    inputRange.addEventListener('input', e => {
        const localPrecoRange = document.querySelector('.preco-range')
        localPrecoRange.innerHTML = `de R$ 0 até R$ ${e.target.value}`
    })

    document.querySelector('.buscar-preco-range').addEventListener('click', e => {
        const produtoNoPreco = produtos.filter((produto) => parseFloat(produto.preco) < inputRange.value)
        renderizarProdutos(produtoNoPreco)
    })
}

function organizarPorId(produtos) {
    const produtoId = produtos.sort((a, b) => (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0))
    renderizarProdutos(produtoId)
}

function organizarProdutos(produtos) {

    document.querySelector('#preco-crescente').addEventListener('change', e => {
        if (e.target.checked == true) {
            const produtosCrescente = produtos.sort((a, b) => (a.preco - b.preco))
            renderizarProdutos(produtosCrescente)
        }
        else {
            organizarPorId(produtos)
        }
    })

    document.querySelector('#preco-decrescente').addEventListener('change', e => {
        if (e.target.checked == true) {
            const produtosDecrescente = produtos.sort((a, b) => (b.preco - a.preco))
            renderizarProdutos(produtosDecrescente)
        }
        else {
            organizarPorId(produtos)
        }
    })

    document.querySelector('#alfabetica').addEventListener('change', e => {
        if (e.target.checked == true) {
            const produtosOrdemAlfabetica = produtos.sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))
            renderizarProdutos(produtosOrdemAlfabetica)
        }
        else {
            organizarPorId(produtos)
        }
    })
}

function salvarProduto(params) {
    const options = {
        method: '',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }

    if (params.id) {
        options.method = 'PUT'
        fetch(`http://localhost:3001/produtos/${params.id}`, options)
            .then(result => result.json())
            .then(res => {
                const indexProdutoExclusao = Produtos.indexOf(Produtos.find(produto => produto.id == params.id))
                Produtos.splice(indexProdutoExclusao, 1, params)
                localProdutos.innerHTML = ''
                renderizarProdutos(Produtos)
                exibirMensagem(res.message)
            })  
    }
    else {
        options.method = 'POST'
        fetch('http://localhost:3001/produtos', options)
            .then(result => result.json())
            .then(res => {
                Produtos.push(res.produto)
                localProdutos.innerHTML = ''
                renderizarProdutos(Produtos)
                exibirMensagem(res.message)
            })   
    }
}

function excluirProduto(id) {
    const options = {
        method: 'DELETE'
    }

    fetch(`http://localhost:3001/produtos/${id}`, options)
        .then(result => result.json())
        .then(res => exibirMensagem(res.message))
}

function exibirMensagem(message) {
    const messageContainer = document.querySelector('.message-request')
    const p = document.querySelector('.message-request > p')
    p.innerHTML = message

    messageContainer.classList.add('visible')

    setInterval(() => {
        messageContainer.classList.remove('visible')
    }, 5000)
}

document.querySelector('.salvar').addEventListener('click', e => {
    e.preventDefault()
    const form = document.querySelector('.form')
    const params = {
        id: parseInt(form.id.value),
        nome: form.nome.value,
        preco: parseFloat(form.preco.value),
        imagemUrl: form.imagemUrl.value,
        categoriaId: parseInt(form.categoriaId.value),
        descricao: form.descricao.value,
        categoriaNome: form.categoriaNome.value
    }

    if(!params.id) delete params.id
    if(!params.categoriaNome) delete params.categoriaNome

    salvarProduto(params)
})