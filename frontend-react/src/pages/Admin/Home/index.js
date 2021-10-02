import React from "react";

import Chart from 'react-apexcharts'
import Sidebar from "../../../components/Sidebar";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Statistic from "../../../components/Statistic";

import { OptionsChart, Series } from '../../../data/chart'

import './style.css'

const HomeAdmin = () => {
    return (
        <div className="home-admin-container">
            <Sidebar page="Início" />
            <main className="main-home-admin-container">
                <HeaderAdmin />
                <div className="main-home-admin-content">
                    <div className="statistic-container">
                        <Statistic value="R$ 1.589,35" text="Total diário" icon="cash-outline" color="#E7A117" />
                        <Statistic value="R$ 50.457,32" text="Total mensal" icon="cash-outline" color="#2B9E74" />
                        <Statistic value="21" text="Vendas hoje" icon="file-tray-outline" color="#D75C5C" />
                        <Statistic value="515" text="Vendas no mês" icon="file-tray-stacked-outline" color="#7971EA" />
                    </div>
                    <div className="chart-container">
                        <h1>Relação de lucro e vendas mensais</h1>
                        <Chart type="area" height={500} options={OptionsChart} series={Series} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomeAdmin