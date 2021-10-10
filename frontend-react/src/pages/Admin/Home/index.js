import React, { useEffect, useState } from "react";
import api from '../../../services/api'

import Chart from 'react-apexcharts'
import Sidebar from "../../../components/Sidebar";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Statistic from "../../../components/Statistic";

import { OptionsChart } from '../../../data/chart'

import './style.css'

const HomeAdmin = () => {

    const [series, setSeries] = useState([])
    const [seriesa, setSeriesa] = useState([])
    const [options, setOptions] = useState({})

    useEffect(async () => {

        const { data } = await api.get('/statistics/home')

        const seriesFormated = [
            {
                name: "Lucro",
                data: data.chart.totals,
                foreColor: "#EEEEEE"
            }/*,
            {
                name: "Vendas",
                data: data.chart.amounts,
                foreColor: "#EEEEEE"
            }*/
        ]

        const seriesFormated2 = [
            {
                name: "Vendas",
                data: data.chart.amounts,
                foreColor: "#EEEEEE"
            }
        ]

        OptionsChart.xaxis.categories = data.chart.months
        console.log(seriesFormated)

        setOptions(OptionsChart)
        setSeries(seriesFormated)
        setSeriesa(seriesFormated2)

    }, [])

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
                        <div className="chart">
                            <h1>Lucro em reais</h1>
                            <Chart type="area" height={500} options={options} series={series} />
                        </div>
                        <div className="chart">
                            <h1>Quantidade de Vendas</h1>
                            <Chart type="area" height={500} options={options} series={seriesa} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomeAdmin