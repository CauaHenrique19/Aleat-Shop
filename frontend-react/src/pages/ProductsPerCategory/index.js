import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import Header from '../../components/Header'
import Cart from '../../components/Cart'
import Product from '../../components/Product'

import './style.css'

const ProductsPerCategory = (props) => {

    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({})

    useEffect(() => {
        api.get(`/products-category/${props.match.params.id}`)
            .then(res => setProducts(res.data))
            .catch(error => console.error(error.message))

        api.get(`/categories/${props.match.params.id}`)
            .then(res => setCategory(res.data))
            .catch(error => console.error(error.message))
    }, [])

    return (
        <div className="products-per-category-container">
            <Cart />
            <Header />
            <div className="products-per-category-content">
                <div className="filter-products-container">

                </div>
                <div className="products-content">
                    <div className="header-products-content">
                        <div style={{ backgroundColor: category.color }} className="icon-container">
                            <ion-icon name={category.icon}></ion-icon>
                        </div>
                        <h1>{category.name}</h1>
                    </div>
                    <div className="products">
                        {
                            products.map(product => <Product smaller product={product} /> )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPerCategory