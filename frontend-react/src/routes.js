import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Login from './pages/Login'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes