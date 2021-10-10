import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Product = ({ product }) => {

    const { cart, setCart } = useContext(Context)

    function addToCart(product){
        cart.products.push(product)
        const newTotalCart = cart.products.reduce((accumulator, actual) => parseFloat(actual.price * actual.quantity) + accumulator, 0)
        const newCart = { products: cart.products, total: newTotalCart }
        setCart(newCart)
    }

    return (
        <div className="product">
            <button className="add-to-favorite">
                <ion-icon name="heart-outline"></ion-icon>
            </button>
            <div className="product-image">
                <img src={product.image_url} alt="Produto" />
            </div>
            <div className="product-info">
                <h2>{product.name.substring(0, 50).trim()}...</h2>
                <p>{product.description.substring(0, 100).trim()}...</p>
                <div className="price-content">
                    <h2>R$ {parseFloat(product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h2>
                    <button onClick={() => addToCart({ ...product, quantity: 1 })}>
                        <ion-icon name="cart-outline"></ion-icon>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product