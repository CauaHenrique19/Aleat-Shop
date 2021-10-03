import React, { createContext, useEffect, useState } from 'react'
//import api from '../services/api'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(localStorage.getItem('aleatshop_token') || { token: null, admin: null, user_id: null })
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('aleatshop_user')))
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('aleatshop_cart')) || [])
    
    const [headers, setHeaders] = useState({
        headers: {
            token: token,
            admin: user.admin,
            user_id: user.id
        }
    })

    useEffect(() => {
        setHeaders({
            headers: {
                token: token,
                admin: user.admin,
                user_id: user.id
            }
        })
    }, [token, user])

    useEffect(() => {
        localStorage.setItem('aleatshop_cart', JSON.stringify(cart))
    }, [cart])

    //const [categories, setCategories] = useState([])
    //const [products, setProducts] = useState([])

    // useEffect(() => {
    //     api.get('/categories', headers)
    //         .then(res => setCategories(res.data))
    //         .catch(error => console.log(error))

    //     api.get('/products', headers)
    //         .then(res => setProducts(res.data))
    //         .catch(error => console.log(error))
    // }, [headers])

    return (
        <Context.Provider value={{
            user, setUser,
            token, setToken,
            headers,
            cart, setCart
            //categories, setCategories,
            //products, setProducts
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider