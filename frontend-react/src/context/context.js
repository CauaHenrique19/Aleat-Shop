import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(localStorage.getItem('aleatshop_token') || { token: null, admin: null, user_id: null })
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('aleatshop_user')))
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('aleatshop_cart')) || { products: [], total: 0 })
    const [openCart, setOpenCart] = useState(false)
    
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

    return (
        <Context.Provider value={{
            user, setUser,
            token, setToken,
            headers,
            cart, setCart,
            openCart, setOpenCart
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider