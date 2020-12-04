import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Landing} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes