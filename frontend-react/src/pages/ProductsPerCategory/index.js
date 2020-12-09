import React from 'react'

import Header from '../../components/Header'

import './style.css'
const ProductsPerCategory = () => {
    return (
        <div className="products-per-category-container">
            <Header />
            <div className="products-per-category-container-main">
                <div className="filters">
                    <h1>Filtrar</h1>
                    <div className="search-container">
                        <input type="text" placeholder="Pesquisar" />
                        <ion-icon name="search"></ion-icon>
                    </div>
                    <div className="order-by">
                        <h1>Ordenar Por:</h1>
                        <div className="checkbox-container">
                            <input type="checkbox" name="price-growing" id="price-growing" />
                            <label htmlFor="price-growing">Preço Crescente</label>
                        </div>
                        <div className="checkbox-container">
                            <input type="checkbox" name="price-decreasing" id="price-decreasing" />
                            <label htmlFor="price-decreasing">Preço Decrescente</label>
                        </div>
                        <div className="checkbox-container">
                            <input type="checkbox" name="alphabet-order" id="alphabet-order" />
                            <label htmlFor="alphabet-order">Ordem Alfabética</label>
                        </div>
                        <input type="range" name="range" id="range" class="range" max="10000" />
                        <p class="price-range">de R$ 0 até R$ 50</p>
                        <button class="search-range">Buscar</button>
                    </div>
                    <div className="order-by-categories">
                        <h1>Categorias</h1>
                        <div className="order-by-categories-wrapper">
                            <div className="category">
                                Periféricos
                                <ion-icon name="close"></ion-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPerCategory