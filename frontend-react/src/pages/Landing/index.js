import React, { useState, useRef } from 'react'

import Header from '../../components/Header'

import Sale1 from '../../assets/sale-1.png'
import Sale2 from '../../assets/sale-2.png'

import './style.css'

const Landing = () => {

    let [count, setCount] = useState(1)
    let [valueSlider] = useState(-50)
    let [actualValueSlider, setActualValueSlider] = useState(0)
    let [maxCount, setMaxCount] = useState(2)

    const el = useRef(null)
    const buttonPreviousEL = useRef(null)
    const buttonNextEL = useRef(null)

    function handlePrevious() {
        actualValueSlider === 0 ? actualValueSlider = 0 : actualValueSlider -= valueSlider
        setActualValueSlider(actualValueSlider)

        el.current.style.transform = `translate3d(${actualValueSlider}%, 0, 0)`

        count -= 1
        setCount(count)
        verifyCount()
    }
    
    function handleNext() {
        actualValueSlider === 0 ? actualValueSlider = valueSlider : setActualValueSlider(1)
        actualValueSlider = valueSlider * count
        setActualValueSlider(actualValueSlider)

        el.current.style.transform = `translate3d(${actualValueSlider}%, 0, 0)`

        count += 1
        setCount(count)
        verifyCount()
    }

    function verifyCount() {
        count === 1 ? buttonPreviousEL.current.style.display = 'none' : buttonPreviousEL.current.style.display = 'flex'
        count === maxCount ? buttonNextEL.current.style.display = 'none' : buttonNextEL.current.style.display = 'flex'
    }
    
    return (
        <div className="landing-container">
            <Header />
            <div className="slide-container">
                <div ref={el} className="slider">
                    <img src={Sale1} alt="" />
                    <img src={Sale2} alt="" />
                </div>
                <div className="previous-button" ref={buttonPreviousEL} onClick={handlePrevious}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </div>
                <div className="next-button" ref={buttonNextEL} onClick={handleNext}>
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