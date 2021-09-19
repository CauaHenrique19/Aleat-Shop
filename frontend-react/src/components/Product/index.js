import React from 'react'

import './style.css'

const Product = () => {
    return (
        <div className="product">
            <button className="add-to-favorite">
                <ion-icon name="heart-outline"></ion-icon>
            </button>
            <div className="product-image">
                <img src="https://aleatshop.s3.sa-east-1.amazonaws.com/3932f93fd92edd80cd0e45390fbc1bd7-League%252B.png" alt="Produto" />
            </div>
            <div className="product-info">
                <h1>Nome Do Produto</h1>
                <p>
                    OSKDAOSDKAOSDAOSDKAOSDKASODKASODKASODKASODOSKDAOSD
                    KAOSDAOSDKAOSDKASODKASODKASODKASODOSKDAOSDKAOSDAOSDK
                    AOSDKASODKASODKASODKASODOSKDAOSDKAOSDAOSDKAOSDKASODKASO
                </p>
                <div className="price-content">
                    <h2>R$ 35,99</h2>
                    <button>
                        <ion-icon name="cart-outline"></ion-icon>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product