var dados = {
    produtos: [],
    categorias: []
}

fetch('http://localhost:3001/categoria')
    .then((res) => res.json())
    .then((data) => {
        dados.categorias = data
    })
    .catch((err) => console.error(err))

fetch('http://localhost:3001/produto')
    .then((res) => res.json())
    .then((data) => {
        dados.produtos = data.sort((a, b) => (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0))
        gerarOpcoesCategorias(dados.categorias)
        gerarCategorias(dados.categorias, dados.produtos)

        renderizarProdutos(dados.produtos)
        organizarProdutos(dados.produtos)
        pesquisa(dados.produtos)
        precoRange(dados.produtos)
    })
    .catch((err) => console.error(err))

function renderizarProdutos(obj) {
    const localProdutos = document.querySelector('.ofertas')
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
            const index = btn.dataset.indice
            const produto = obj.find((produto) => produto.id == index)

            const form = document.querySelector('.form')
            form.id.value = produto.id
            form.nome.value = produto.nome
            form.preco.value = produto.preco
            form.imagemUrl.value = produto.imagemUrl
            form.categoriaId.value = produto.categoriaId
            form.descricao.value = produto.descricao
        })
    })
    document.querySelectorAll('.remover-oferta').forEach((btn) => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.indice
            const produto = obj.find((produto) => produto.id == index)
            const id = produto.id

            excluirProduto(id)

            const oferta = document.querySelector('.oferta')
            const local = document.querySelector('.ofertas')

            local.removeChild(oferta)
        })
    })
}
function gerarOpcoesCategorias(obj) {
    const select = document.querySelector('select')
    select.innerHTML += obj.map((categoria) => `<option value="${categoria.id}">${categoria.id} - ${categoria.nome}</option>`)
}

function gerarCategorias(categorias, produtos){
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

function precoRange(produtos){
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

function organizarPorId(produtos){
    const produtoId = produtos.sort((a, b) => (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0))
    renderizarProdutos(produtoId)
}

function organizarProdutos(produtos){

    document.querySelector('#preco-crescente').addEventListener('change', e => {
        
        if(e.target.checked == true){
            const produtosCrescente = produtos.sort((a, b) => (a.preco - b.preco))
            renderizarProdutos(produtosCrescente)
        }
        else{
            organizarPorId(produtos)
        }
    })

    document.querySelector('#preco-decrescente').addEventListener('change', e => {
    
        if(e.target.checked == true){
            const produtosDecrescente = produtos.sort((a, b) => (b.preco - a.preco))
            renderizarProdutos(produtosDecrescente)
        }
        else{
            organizarPorId(produtos)
        }
    
    })

    document.querySelector('#alfabetica').addEventListener('change', e => {
    
        if(e.target.checked == true){
            const produtosOrdemAlfabetica = produtos.sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))
            renderizarProdutos(produtosOrdemAlfabetica)
        }
        else{
            organizarPorId(produtos)
        }
    })
}

function salvarProduto(params = {}) {

    var ajax = new XMLHttpRequest()
    ajax.open('POST', '/produto', true)
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(`nome=${params.nome}&preco=${params.preco}&descricao=${params.descricao}&imagemUrl=${params.imagemUrl}&categoriaId=${params.categoriaId}`)

    ajax.onload = event => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = JSON.parse(ajax.responseText);

            console.log(data)
        }
    }
}

function editarProduto(params = {}) {

    const dados = new URLSearchParams(params)
    const id = params.get('id')

    var ajax = new XMLHttpRequest()
    ajax.open('PUT', `/produto/${id}`, true)
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(dados)

    ajax.onload = event => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;
        }
    }
}

function excluirProduto(params = {}) {

    var ajax = new XMLHttpRequest()
    ajax.open('DELETE', `/produto/${params}`, true)
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send('id=' + params)

    ajax.onload = event => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;
        }
    }
}

document.querySelector('.salvar').addEventListener('click', e => {

    const form = document.querySelector('.form')
    const formData = new FormData(form)

    const id = formData.get('id')

    if (id) {
        editarProduto(formData)
    }
    else {
        const params = {
            nome: formData.get('nome'),
            preco: formData.get('preco'),
            imagemUrl: formData.get('imagemUrl'),
            categoriaId: formData.get('categoriaId'),
            descricao: formData.get('descricao')
        }
        salvarProduto(params)
    }
})