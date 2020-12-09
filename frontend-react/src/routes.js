import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import ProductsPerCategory from './pages/ProductsPerCategory'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Landing} exact />
                <Route path="/products-per-category/:id" component={ProductsPerCategory} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes