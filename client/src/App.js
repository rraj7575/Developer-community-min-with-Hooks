import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authActions'
import store from './store/store'
import {logoutUser} from './actions/authActions'
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
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
