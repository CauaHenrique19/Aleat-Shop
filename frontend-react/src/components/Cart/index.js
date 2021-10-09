import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Cart = () => {
    const { openCart, setOpenCart } = useContext(Context)

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
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(product => (
                            <div key={product} className="product-cart">
                                <img src="https://aleatshop.s3.sa-east-1.amazonaws.com/d391a70e1915c49a74884abfcba36092-fonte-asus-tuf-gaming-450b-450w-80-plus-bronze-90ye00d3-b0ba00_1602870202_gg.jpg" alt="" />
                                <div className="product-cart-info">
                                    <div className="top-product-cart">
                                        <p>Fonte Asus TUF-GAMING-450B, 450W, 80 Plus...</p>
                                        <button><ion-icon name="close-outline"></ion-icon></button>
                                    </div>
                                    <div className="bottom-product-cart">
                                        <div className="input-container">
                                            <button><ion-icon name="remove-outline"></ion-icon></button>
                                            <input type="number" min="1" readOnly={true} />
                                            <button><ion-icon name="add-outline"></ion-icon></button>
                                        </div>
                                        <p>R$ 649,90</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="total-cart-container">
                    <div className="subtotals">
                        <h2>Subtotal</h2>
                        <h2>R$ 45,90</h2>
                    </div>
                    <div className="subtotals">
                        <h2>Subtotal</h2>
                        <h2>R$ 45,90</h2>
                    </div>
                    <div className="total">
                        <h2>Total</h2>
                        <h2>R$ 45,90</h2>
                    </div>
                </div>
                <button>Finalizar Compra</button>
            </div>
        </div>
    )
}

export default Cart