function carregarCarrinho() {
    const carrinhoStorage = JSON.parse(localStorage.getItem('carrinho'))
    preencherCarrinho(carrinhoStorage)

    const divNumero = document.querySelector('.number-itens-cart')
    divNumero.innerHTML = carrinhoStorage.length
}

function preencherCarrinho(carrinho) {
    const local = document.querySelector('.shopping')

    local.innerHTML = carrinho.map((produto) =>
        `<div class="product-cart" data-indice="${carrinho.indexOf(produto)}">
            <img src="${produto.imagemUrl}"></img>
            <div class="product-info">
                <p class="nome">${produto.nome.substr(0, 25) + '...'}</p>
                <p>${produto.quantidade}x R$ ${produto.preco}</p>
            </div>
            <button class="btn-remove" data-indice="${carrinho.indexOf(produto)}"><i class="fas fa-times"></i></button>
        </div>`).join('')

    calcularTotal(carrinho)

    document.querySelectorAll('.btn-remove').forEach((btn) => {

        btn.addEventListener('click', e => {
            const index = parseInt(btn.dataset.indice)
            const compraCarrinho = local.querySelector(`[data-indice="${index}"]`)

            if (compraCarrinho) {
                carrinho.splice(index, 1)

                localStorage.setItem("carrinho", JSON.stringify(carrinho))

                const divNumero = document.querySelector('.number-itens-cart')
                divNumero.innerHTML = carrinho.length

                local.removeChild(compraCarrinho)
                calcularTotal(carrinho)
            }
        })
    })
}

function calcularTotal(carrinho) {
    let total = carrinho.reduce((soma, corrente) => soma + (corrente.preco * corrente.quantidade), 0).toFixed(2)
    document.querySelector('.total').innerHTML = `
         <p>Subtotal: </p>
         <p>R$ ${total}</p>`
}