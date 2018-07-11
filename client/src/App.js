import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authActions'
import store from './store/store'
import {clearCurrentProfile} from "./actions/profileAction";
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
// import Dashboard from './../src/components/dashboard/Dashboard'
//Check for token

if (localStorage.jwtToken) {
  //set auth token header auth
  //Decode data
  const decodedData = jwt_decode(localStorage.jwtToken)
  //Set user and isAuthenticated
  const currentTime = Date.now()/1000
  if (decodedData.exp < currentTime) {
    store.dispatch(setCurrentUser({}))
    //Redirect to login page
    localStorage.removeItem('jwtToken')
    //Remove auth header for future request
    setAuthToken(false)
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }
  setAuthToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decodedData))
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute path='/create-profile' component={CreateProfile} />
              </Switch>
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
