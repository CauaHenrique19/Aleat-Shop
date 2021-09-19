import React, { createContext, useEffect, useState } from 'react'
//import api from '../services/api'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const tokenStorage =  localStorage.getItem('aleatshop_token') ? localStorage.getItem('aleatshop_token') : ''
    const userStorage = JSON.parse(localStorage.getItem('aleatshop_user')) ? JSON.parse(localStorage.getItem('aleatshop_user')) : ''

    const [user, setUser] = useState(userStorage)
    const [token, setToken] = useState(tokenStorage)
    
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
            //categories, setCategories,
            //products, setProducts
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider