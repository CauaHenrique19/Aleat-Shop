import React, { useEffect, useState } from 'react'
import api from '../../../services/api'

import HeaderAdmin from '../../../components/HeaderAdmin'
import Sidebar from '../../../components/Sidebar'
import Statistic from '../../../components/Statistic'

import './style.css'

const Products = () => {

    const [products, setProducts] = useState([])

    const [inputFocused, setInputFocuses] = useState(false)

    useEffect(() => {
        api.get('/products')
            .then(res => setProducts(res.data.result))
            .catch(error => console.log(error.message))
    }, [])

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
                <div className="main-products">
                    <div className="header-main-products">
                        <h1>Produtos</h1>
                        <div className={inputFocused ? "input-container focused" : "input-container"}>
                            <input 
                                type="text" 
                                placeholder="Pesquise..." 
                                onBlur={() => setInputFocuses(false)} 
                                onFocus={() => setInputFocuses(true)} 
                            />
                            <ion-icon name="search-outline"></ion-icon>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Produto</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                        {
                            products &&
                            products.length > 0 &&
                            products.map(product => (
                                <tr key={product.id}>
                                    <td className="product-id">{product.id}</td>
                                    <td><img src={product.image_url} alt={product.name} /></td>
                                    <td>{product.name.substr(0, 40)}...</td>
                                    <td>{product.description.substr(0, 80)}...</td>
                                    <td>R$ {parseFloat(product.price).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <button className="btn-edit">Editar</button>
                                        <button className="btn-delete">Excluir</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Products