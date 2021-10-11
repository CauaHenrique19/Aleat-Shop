import React, { useEffect, useState } from "react";
import api from '../../../services/api'

import Chart from 'react-apexcharts'
import Sidebar from "../../../components/Sidebar";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Statistic from "../../../components/Statistic";

import { OptionsProfit, OptionsSale } from '../../../data/chart'

import './style.css'

const HomeAdmin = () => {

    const [seriesProfit, setSeriesProfit] = useState([])
    const [seriesSale, setSeriesSale] = useState([])

    const [optionsProfit, setOptionsProfit] = useState({})
    const [optionsSale, setOptionsSale] = useState({})

    const [totalDiary, setTotalDiary] = useState(0)
    const [totalMonthly, setTotalMonthly] = useState(0)
    const [salesToday, setSalesToday] = useState(0)
    const [salesMonthly, setSalesMonthly] = useState(0)

    useEffect(() => {

        async function getData(){
            const { data } = await api.get('/statistics/home')
            
            setTotalDiary(data.diarySoldAmount)
            setTotalMonthly(data.monthlySoldAmount)
            setSalesToday(data.diarySales)
            setSalesMonthly(data.monthlySales)
    
            const newSeriesProfit = [
                {
                    name: "Lucro",
                    data: data.chart.totals,
                    foreColor: "#EEEEEE"
                }
            ]
    
            const newSeriesSale = [
                {
                    name: "Vendas",
                    data: data.chart.amounts,
                    foreColor: "#EEEEEE"
                }
            ]
    
            OptionsProfit.xaxis.categories = data.chart.months
            OptionsSale.xaxis.categories = data.chart.months
    
            setOptionsProfit(OptionsProfit)
            setOptionsSale(OptionsSale)
            
            setSeriesProfit(newSeriesProfit)
            setSeriesSale(newSeriesSale)
        }

        getData()

    }, [])

    return (
        <div className="home-admin-container">
            <Sidebar page="Início" />
            <main className="main-home-admin-container">
                <HeaderAdmin />
                <div className="main-home-admin-content">
                    <div className="statistic-container">
                        <Statistic value={`R$ ${totalDiary.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`} text="Total diário" icon="cash-outline" color="#E7A117" />
                        <Statistic value={`R$ ${totalMonthly.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`} text="Total mensal" icon="cash-outline" color="#2B9E74" />
                        <Statistic value={salesToday} text="Vendas hoje" icon="file-tray-outline" color="#D75C5C" />
                        <Statistic value={salesMonthly} text="Vendas no mês" icon="file-tray-stacked-outline" color="#7971EA" />
                    </div>
                    <div className="chart-container">
                        <div className="chart">
                            <h1>Lucro em reais</h1>
                            <Chart type="area" height={500} options={optionsProfit} series={seriesProfit} />
                        </div>
                        <div className="chart">
                            <h1>Quantidade de Vendas</h1>
                            <Chart type="area" height={500} options={optionsSale} series={seriesSale} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomeAdmin