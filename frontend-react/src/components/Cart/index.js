import React, { useContext } from 'react'
import { Context } from '../../context/context'

import './style.css'

const Cart = () => {
    const { openCart } = useContext(Context)

    return (
        <div className={`${openCart ? 'cart-lateral-container open' : 'cart-lateral-container' }`}>
            <div className="content-lateral-cart">
                <div className="header-cart">
                    <h1>Carrinho</h1>
                    <p>5 Itens</p>
                </div>
                <div className="products-cart">
                    <div className="product-cart">
                        <img src="https://aleatshop.s3.sa-east-1.amazonaws.com/d391a70e1915c49a74884abfcba36092-fonte-asus-tuf-gaming-450b-450w-80-plus-bronze-90ye00d3-b0ba00_1602870202_gg.jpg" alt="" />
                        <div className="product-cart-info">
                            <p>Fonte Asus TUF-GAMING-450B, 450W...</p>
                            <p>R$ 649,90</p>
                        </div>
                    </div>
                    <div className="product-cart">
                        <img src="https://aleatshop.s3.sa-east-1.amazonaws.com/d391a70e1915c49a74884abfcba36092-fonte-asus-tuf-gaming-450b-450w-80-plus-bronze-90ye00d3-b0ba00_1602870202_gg.jpg" alt="" />
                        <div className="product-cart-info">
                            <p>Fonte Asus TUF-GAMING-450B, 450W...</p>
                            <p>R$ 649,90</p>
                        </div>
                    </div>
                    <div className="product-cart">
                        <img src="https://aleatshop.s3.sa-east-1.amazonaws.com/d391a70e1915c49a74884abfcba36092-fonte-asus-tuf-gaming-450b-450w-80-plus-bronze-90ye00d3-b0ba00_1602870202_gg.jpg" alt="" />
                        <div className="product-cart-info">
                            <p>Fonte Asus TUF-GAMING-450B, 450W...</p>
                            <p>R$ 649,90</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart