let Categorias = []

fetch('http://localhost:3001/categorias')
    .then(res => res.json())
    .then(data => {
        Categorias.push(...data)
        renderizarLinhas(Categorias)
    })

const table = document.querySelector('.users')

function renderizarLinhas(categorias) {
    table.innerHTML = categorias.map((categoria) => `
        <tr data-categoriaid="${categoria.id}">
            <td class="id">${categoria.id}</td>
            <td class="nome">${categoria.nome}</td>
            <td>
                <button class="editar" data-categoriaid="${categoria.id}"><i class="fas fa-pencil-alt"></i>Editar</button>
                <button class="remover" data-categoriaid="${categoria.id}"><i class="fas fa-trash-alt"></i>Remover</button>
            </td>
        </tr>`).join('')

    document.querySelectorAll('.editar').forEach((btn) => {
        btn.addEventListener('click', e => {
            const index = btn.dataset.categoriaid
            const categoriaBtn = categorias.find((categoria) => categoria.id == index)

            document.querySelector('.input-id').value = categoriaBtn.id
            document.querySelector('.input-nome').value = categoriaBtn.nome
        })
    })
    document.querySelectorAll('.remover').forEach((btn) => {
        btn.addEventListener('click', e => {
            const index = parseInt(btn.dataset.categoriaid)
            const categoriaBtn = categorias.find((categoria) => categoria.id == index)

            excluirCategoria(categoriaBtn.id)

            const tr = document.querySelector(`[data-categoriaid="${categoriaBtn.id}"]`)
            const tbody = document.querySelector('tbody')
            tbody.removeChild(tr)
        })
    })
}

function salvarCategoria(params) {

    const options = {
        method: '',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ nome : params.nome })
    }
    
    if (params.id) {
        options.method = 'PUT'
        fetch(`http://localhost:3001/categorias/${params.id}`, options)
            .then(result => result.json())
            .then(res => {
                const indexCategoriaExlusao = Categorias.indexOf(Categorias.find(categoria => categoria.id == params.id))
                Categorias.splice(indexCategoriaExlusao, 1, params) 
                table.innerHTML = ''
                renderizarLinhas(Categorias)
                exibirMensagem(res.message)
            })
    }
    else {
        options.method = 'POST'
        fetch('http://localhost:3001/categorias', options)
            .then(result => result.json())
            .then(res => {
                Categorias.push(res.categoria)
                table.innerHTML = ''
                renderizarLinhas(Categorias)
                exibirMensagem(res.message)
            })
    }
}

function excluirCategoria(id) {

    const options = {
        method: 'DELETE'
    }

    fetch(`http://localhost:3001/categorias/${id}`, options)
        .then(result => result.json())
        .then(res => exibirMensagem(res.message))
}

function exibirMensagem(message){
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

    const params = {
        id: parseInt(document.querySelector('.input-id').value),
        nome: document.querySelector('.input-nome').value
    }

    salvarCategoria(params)
})