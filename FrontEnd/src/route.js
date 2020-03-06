import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

const PrivateRouter = ({ component: Component, ...rest }) =>(
    <Route 
        { ...rest } 
        render={ 
            props => (
                isAuthenticated() ?
                ( <Component { ...props } /> ) :
                ( <Redirect to={{ pathname: '/', state: { from: props.location } }} /> )
            ) 
        } 
    />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ SignIn } />
            <Route path="/signup" component={ SignUp } />
            <PrivateRouter path="/home" component={ Home } />
            <Route path="*" component={ () => <h1>Page not found</h1> } />
        </Switch>
    </BrowserRouter>
);

export default Routes;
