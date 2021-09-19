import React, { useContext } from 'react'
import { Context } from '../../context/context'
import { useHistory } from 'react-router-dom'

import ImageUser from '../../assets/default-user-image.png'
import Logo from '../../assets/logo.png'
import './style.css'

const Header = () => {

    const { setToken, setUser, user } = useContext(Context)
    const history = useHistory()

    function handleLogout(){
        localStorage.removeItem('aleatshop_token')
        localStorage.removeItem('aleatshop_user')
        setToken('')
        setUser('')
        history.push('/login')
    }

    return (
        <header className="header">
            <img src={Logo} alt="AleatShop" />
            <div className="info-container">
                <div className="user">
                    <ion-icon name="person-outline"></ion-icon>
                    <h2>{user.name}</h2>
                </div>
                <div className="cart">
                    <ion-icon name="cart-outline"></ion-icon>
                    <div className="number">5</div>
                </div>
                <div className="favorites">
                    <ion-icon name="heart-outline"></ion-icon>
                    <div className="number">5</div>
                </div>
                {
                    <div className="admin">
                        <ion-icon name="settings-outline"></ion-icon>
                    </div>
                }
                <div className="logout" onClick={handleLogout}>
                    <ion-icon name="log-out-outline"></ion-icon>
                </div>
            </div>
        </header>
    )
}

export default Header