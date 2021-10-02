import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import api from '../../services/api'

import Logo from '../../assets/logo.png'
import './style.css'

const Login = () => {

    const { setUser, setToken } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    function handleLogin(){
        const user = {
            email,
            password
        }

        api.post('/login', user)
            .then(res => {
                if(!res.data.error){
                    console.log(res.data)
                    localStorage.setItem('aleatshop_token', res.data.token)
                    localStorage.setItem('aleatshop_user', JSON.stringify(res.data.user))
                    setUser(res.data.user)
                    setToken(res.data.token)
                    history.push('/')
                }
                else{
                    console.log(res.data)
                }
            })
            .catch(error => console.log(error))
    }
    
    return (
        <div className="login-container">
            <div className="form-login">
                <img src={Logo} className="logo" alt="AleatShop"/>
                <div className="input-container">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="Digite o email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="Digite a senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin}>Entrar</button>
                <Link to="/signup">Não tem conta? Cadastre-se Aqui.</Link>
            </div>
        </div>
    )
}

export default Login