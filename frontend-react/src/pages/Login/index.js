import React from 'react'

import Logo from '../../assets/logo-preta.png'
import './style.css'

const Login = () => {
    return (
        <div className="login-container">
            <img src={Logo} className="logo" alt="AleatShop"/>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Digite o email" />
            </div>
            <div className="input-container">
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Digite a senha" />
            </div>
        </div>
    )
}

export default Login