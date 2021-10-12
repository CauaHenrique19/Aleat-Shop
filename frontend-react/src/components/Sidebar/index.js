import React, { useState } from "react";
import { Link } from "react-router-dom";

import './style.css'

const Sidebar = ({ page }) => {

    const [closed, setClosed] = useState(false)

    return (
        <aside className={`${closed ? 'closed sidebar' : 'sidebar'}`}>
            <div className="header-sidebar">
                <h1>{page}</h1>
                <button onClick={() => setClosed(!closed)}>
                    <ion-icon name="menu-outline"></ion-icon>
                </button>
            </div>
            <ul>
                <li>
                    <Link to="/admin/" className={`${page === 'Início' ? 'selected' : ''}`} >
                        <ion-icon name="home-outline"></ion-icon>
                        <p>Início</p>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/products">
                        <ion-icon name="cube-outline"></ion-icon>
                        <p>Produtos</p>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                        <p>Pedidos</p>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/slides">
                        <ion-icon name="image-outline"></ion-icon>
                        <p>Slides</p>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar