import React from "react";

import Sidebar from "../../../components/Sidebar";
import HeaderAdmin from "../../../components/HeaderAdmin";

import './style.css'

const HomeAdmin = () => {
    return (
        <div className="home-admin-container">
            <Sidebar page="Início" />
            <main className="main-home-admin-container">
                <HeaderAdmin />
            </main>
        </div>
    )
}

export default HomeAdmin