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
        <header className="header" >
            <div className="logo-container">
                <img src={Logo} alt="AleatShop"/>
            </div>
            <div className="info-container">
                <div className="user-container">
                    <img src={ImageUser} alt=""/>
                    <h2>{user.name}</h2>
                </div>
                {
                    user.admin &&
                    <div className="admin-container">
                        <ion-icon name="settings-outline"></ion-icon>
                    </div>
                }
                <div className="logout-container" onClick={handleLogout}>
                    <ion-icon name="log-out-outline"></ion-icon>
                    <h2>Sair</h2>
                </div>
            </div>
        </header>
    )
}

export default Header