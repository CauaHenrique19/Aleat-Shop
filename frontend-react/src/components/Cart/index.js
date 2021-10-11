import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Cart = () => {
    const { openCart, setOpenCart, cart, setCart } = useContext(Context)

    function removeProductCart(product){
        cart.products.splice(cart.products.indexOf(product), 1)
        const totalCart = cart.products.reduce((accumulator, actual) => parseFloat(actual.price * actual.quantity) + accumulator, 0)
        const newCart = { products: [...cart.products], total: totalCart }
        setCart(newCart)
    }

    function changeQuantity(product, value){
        product.quantity = product.quantity + value

        if(product.quantity < 1){
            product.quantity = 1
        }

        const indexOfProduct = cart.products.indexOf(product)
        cart.products[indexOfProduct] = product
        const totalCart = cart.products.reduce((accumulator, actual) => parseFloat(actual.price * actual.quantity) + accumulator, 0)
        const newCart = { products: [...cart.products], total: totalCart }
        
        setCart(newCart)
    }

    return (
        <div className={`${openCart ? 'cart-lateral-container open' : 'cart-lateral-container' }`}>
            <div className="content-lateral-cart">
                <div className="header-cart">
                    <h1>Carrinho</h1>
                    <button onClick={() => setOpenCart(!openCart)} >
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                </div>
                <div className="products-cart">
                    {
                        cart.products.length > 0 &&
                        cart.products.map(product => (
                            <div key={product.id} className="product-cart">
                                <img src={product.image_url} alt={product.name} />
                                <div className="product-cart-info">
                                    <div className="top-product-cart">
                                        <p>{product.name.substring(0, 60)}...</p>
                                        <button onClick={() => removeProductCart(product)} ><ion-icon name="close-outline"></ion-icon></button>
                                    </div>
                                    <div className="bottom-product-cart">
                                        <div className="input-container">
                                            <button onClick={() => changeQuantity(product, -1)}><ion-icon name="remove-outline"></ion-icon></button>
                                            <input type="number" readOnly={true} value={product.quantity} />
                                            <button onClick={() => changeQuantity(product, 1)}><ion-icon name="add-outline"></ion-icon></button>
                                        </div>
                                        <p>R$ {parseFloat(product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="total-cart-container">
                    <div className="subtotals">
                        <h2>Subtotal</h2>
                        <h2>R$ {cart.total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h2>
                    </div>
                    <div className="total">
                        <h2>Total</h2>
                        <h2>R$ {cart.total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h2>
                    </div>
                </div>
                <button>Finalizar Compra</button>
            </div>
        </div>
    )
}

export default Cart