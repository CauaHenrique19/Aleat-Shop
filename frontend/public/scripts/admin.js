var categorias = []

function pegarCategorias() {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest()
        ajax.open('GET', '/categoria')

        ajax.onload = event => {
            categorias = JSON.parse(ajax.responseText)
            renderizarLinhas(categorias)
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

    return Promise.all(promises)
}
executarPromises()

function renderizarLinhas(categorias) {

    const table = document.querySelector('.users')
    table.innerHTML = categorias.map((categoria) => `
        <tr data-categoriaid="${categoria.id}">
            <td class="id">${categoria.id}</td>
            <td class="nome">${categoria.nome}</td>
            <td>
                <button class="editar" data-categoriaid="${categoria.id}"><i class="fas fa-pencil-alt"></i>Editar</button>
                <button class="remover" data-categoriaid="${categoria.id}"><i class="fas fa-trash-alt"></i>Remover</button>
            </td>
        </tr>
    `).join('')

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
            const index = btn.dataset.categoriaid
            const categoriaBtn = categorias.find((categoria) => categoria.id == index)

            excluirCategoria(categoriaBtn.id)
            
            const tr = document.querySelector(`[data-categoriaid="${categoriaBtn.id}"]`)
            const tbody = document.querySelector('tbody')
            tbody.removeChild(tr)

        })
    })
}

function salvarCategoria(params = {}) {

    var ajax = new XMLHttpRequest()
    ajax.open('POST', '/categoria', true)
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(`nome = ${params}`)

    ajax.onload = event => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;
            console.log(data)
        }
    }   
}

function editarCategoria(params = {}){

    var ajax = new XMLHttpRequest()
    ajax.open('PUT', `/categoria/${params.id}`, true)
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(`id=${params.id}&nome=${params.nome}`)

    ajax.onload = event => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;  
        }
    }
}

function excluirCategoria(params = {}){
    var ajax = new XMLHttpRequest()
    ajax.open('DELETE', `/categoria/${params}`, true)
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send('id=' + params)

    ajax.onload = event => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var data = ajax.responseText;
            console.log(data)
        }
    }
}

document.querySelector('.salvar').addEventListener('click', e => {
    const nome = document.querySelector('.input-nome').value
    const id = document.querySelector('.input-id').value

    const params = {id, nome}

    if(id){
        editarCategoria(params)
    }
    else {
        salvarCategoria(nome)
    }
})

