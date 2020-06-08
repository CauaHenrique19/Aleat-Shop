var produtos = []
var pedido = {}
var produtosStorage = []

const carrinho = JSON.parse(localStorage.getItem('carrinho'))
gerarProdutosCarrinho(carrinho)
calcularTotal(carrinho)

function gerarProdutosCarrinho(carrinho) {

    const local = document.querySelector('.produtos-carrinho')

    local.innerHTML = carrinho.map((produto) =>
        `<div class="product" data-indice="${produto.id}">
            <div class="produto-principal">
                <img src="${produto.imagemUrl}" alt="">
                <p>${produto.nome.substr(0, 45) + '...'}</p>
            </div>
            <p class="valor-unitario">R$ ${produto.preco}</p>
            <div class="input">
                <input class="input-quantidade" type="number" value="${produto.quantidade}" min="1">
            </div>
            <p class="valor-total">R$ ${produto.preco * produto.quantidade}</p>
            <ion-icon class="btn-remove" data-indice="${produto.id}" name="close-circle-outline"></ion-icon>
        </div>`
    ).join('')

    document.querySelectorAll('.btn-remove').forEach((btn) => {

        btn.addEventListener('click', e => {

            const id = JSON.parse(e.target.dataset.indice)
            const div = local.querySelector(`[data-indice="${id}"]`)

            const produto = carrinho.find((produto) => produto.id === id)

            carrinho.splice(carrinho.indexOf(produto), 1)
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            
            local.removeChild(div)
            calcularTotal()

        })
    })
}
function calcularTotal(carrinho) {

    const total = carrinho.reduce((soma, corrente) => soma + (corrente.preco * corrente.quantidade), 0).toFixed(2)
    document.querySelector('.total-carrinho').innerHTML = `R$ ${total}`

}