import React, { useContext } from 'react'
import { Context } from '../../context/context'

import Header from '../../components/Header'

import './style.css'

const Landing = () => {

    const { categories, products } = useContext(Context)
    
    return (
        <div className="landing-container">
            <Header />
            <div className="slide-container">
                <div className="slider"></div>
                <div className="previous-button">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </div>
                <div className="next-button">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>
            <div className="categories-container">
                <div className="category-wrap"></div>
            </div>
        </div>
    )
}

export default Landing