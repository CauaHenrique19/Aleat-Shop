import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Product = ({ product }) => {

    const { cart, setCart } = useContext(Context)

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
                    <button onClick={() => setCart([...cart, product])} >
                        <ion-icon name="cart-outline"></ion-icon>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product