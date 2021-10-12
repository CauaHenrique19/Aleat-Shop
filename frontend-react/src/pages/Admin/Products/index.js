import React from 'react'

import HeaderAdmin from '../../../components/HeaderAdmin'
import Sidebar from '../../../components/Sidebar'
import Statistic from '../../../components/Statistic'

import './style.css'

const Products = () => {
    return (
        <div className="products-admin-container">
            <Sidebar page="Produtos" />
            <main className="main-products-admin-container">
                <HeaderAdmin />
                <div className="main-products-admin-content">
                    <div className="statistic-container">
                        <Statistic value="150" text="Produtos" icon="cube-outline" color="#E7A117" />
                        <Statistic value="RTX 3080" text="Mais vendido" icon="add-circle-outline" color="#2B9E74" />
                        <Statistic value="MEMÓRIA RAM" text="Menos Vendido" icon="remove-circle-outline" color="#D75C5C" />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Products