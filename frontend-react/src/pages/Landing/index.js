import React, { useContext, useState } from 'react'
import { Context } from '../../context/context'

import Header from '../../components/Header'
import Sale1 from '../../assets/sale-1.png'
import Sale2 from '../../assets/sale-2.png'

import './style.css'

const Landing = () => {

    //const { categories, products } = useContext(Context)
    // let translateValue = 0;
    // let nowIndex = 1;
    // let maxIndex = 2;
    
    // function handlePrevious(){
    //     nowIndex--
    //     const slider = document.querySelector('.slider')
    //     translateValue += 50;
    //     slider.style.transform = `translate3d(${translateValue}%, 0, 0)`
    //     verifyIndex()
    // }
    
    // function handleNext(){
    //     nowIndex++
    //     const slider = document.querySelector('.slider')
    //     translateValue -= 50;
    //     slider.style.transform = `translate3d(${translateValue}%, 0, 0)`
    //     verifyIndex()
    // }

    // function verifyIndex(){
    //     const btnPrevious = document.querySelector('.previous-button')
    //     const btnNext = document.querySelector('.next-button')

    //     nowIndex === maxIndex ? btnNext.style.display = 'none' : btnPrevious.style.display = 'flex'
    //     nowIndex > 1 ? btnPrevious.style.display = 'flex' : btnNext.style.display = 'none'
    // }
    
    return (
        <div className="landing-container">
            <Header />
            {/* <div className="slide-container">
                <div className="slider">
                    <img src={Sale1} alt="" />
                    <img src={Sale2} alt="" />
                </div>
                <div className="previous-button" onClick={handlePrevious}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </div>
                <div className="next-button" onClick={handleNext}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div> */}
            <div className="categories-container">
                <div className="category-wrap"></div>
            </div>
        </div>
    )
}

export default Landing