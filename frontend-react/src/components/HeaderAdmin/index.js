import React from "react";
import { Link } from "react-router-dom";

import './style.css'

const HeaderAdmin = () => {
    return (
        <header className="header-admin">
            <h1>AleatShop</h1>
            <div className="buttons-container">
                <Link to="/">
                    <ion-icon name="home-outline"></ion-icon>
                </Link>
                <button>
                    <ion-icon name="log-out-outline"></ion-icon>
                </button>
            </div>
        </header>
    )
}

export default HeaderAdmin