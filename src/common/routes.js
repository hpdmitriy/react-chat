import {Route, IndexRoute, Redirect} from 'react-router';
import React from 'react';

import SignIn from './components/SignIn';
import ChatContainer from './containers/ChatContainer';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import App from './containers/App';
import {checkAuth} from './actions/authActions';

function requireAuth(nextState, replaceState) {
    if (!checkAuth())
        replaceState({ nextPathname: nextState.location.pathname }, '/signin');
}

const Routes = (
    <Route path='/' component={App}>
        <IndexRoute component={HomePage}/>
        <Route path='/welcome' component={HomePage}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/chat' component={ChatContainer} onEnter={requireAuth}/>
        <Route path='*' component={ ErrorPage }/>
    </Route>
);

export default Routes;
