import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'
import Product from '../../components/Product'
import Cart from '../../components/Cart'

import Sale1 from '../../assets/sale-1.png'
import Sale2 from '../../assets/sale-2.png'

import './style.css'

const Landing = () => {

    let [count, setCount] = useState(1)
    let [valueSlider] = useState(-50)
    let [actualValueSlider, setActualValueSlider] = useState(0)
    let [maxCount] = useState(2)

    const [bestSellers, setBestSelles] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get('/products/best-sellers')
            .then(res => setBestSelles(res.data))
            .catch(error => console.error(error.message))

        api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(error => console.error(error.message))
    }, [])

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
            <Cart />
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
            <div className="most-sold">
                <h1>Produtos Mais Vendidos</h1>
                <div className="products-most-sold">
                    {
                        bestSellers.length &&
                        bestSellers.map(bestSeller => (
                            <Product key={bestSeller.id} product={bestSeller} />
                        ))
                    }
                </div>
            </div>
            <div className="categories">
                <div className="header-categories">
                    <ion-icon name="grid-outline"></ion-icon>
                    <h1>Categorias</h1>
                </div>
                <div className="categories-container">
                    {
                        categories.length &&
                        categories.map(category =>
                            <Link style={{ backgroundColor: category.color }} to={`/products-per-category/${category.id}`} key={category.id} className="category">
                                <h1>{category.name}</h1>
                                <div className="icon-category">
                                    <ion-icon name={category.icon}></ion-icon>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Landing