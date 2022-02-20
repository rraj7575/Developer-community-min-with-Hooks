import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Loadable from 'react-loadable'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authActions'
import store from './store/store'
import {clearCurrentProfile} from "./actions/profileAction";
import PrivateRoute from './components/common/PrivateRoute'
import {doLoad} from "./utils/LoadingComponent";

if (localStorage.jwtToken) {
  const decodedData = jwt_decode(localStorage.jwtToken)
  const currentTime = Date.now()/1000
  if (decodedData.exp < currentTime) {
    store.dispatch(setCurrentUser({}))
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }
  console.log('Setting tokens.......')
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
                <Switch>
                  <Route path='/register' exact
                         render={ (props) => <AsyncRegister {...props} /> } />
                  <Route path='/login' exact
                         render={ (props) => <AsyncLogin {...props} /> } />
                  <Route path='/profiles' exact
                         render={ (props) => <AsyncProfiles {...props} /> } />
                  <Route path='/profile/:handle' exact
                         render={ (props) => <AsyncProfile {...props} /> } />
                  <PrivateRoute path='/dashboard' component={AsyncDashboard} />
                  <PrivateRoute path='/feed' component={AsyncPosts} />
                  <PrivateRoute path='/post/:id' component={AsyncPost} />
                </Switch>
              </div>
              <Footer/>
            </div>
          </Router>
        </Provider>
    )
  }
}
const AsyncRegister = Loadable(doLoad(() => import('./components/auth/Register2')))
const AsyncLogin = Loadable(doLoad(() => import('./components/auth/Login2')))
const AsyncProfiles = Loadable(doLoad(() => import('./components/profiles/Profiles2')))
const AsyncProfile = Loadable(doLoad(() => import('./components/profile/Profile')))
const AsyncDashboard = Loadable(doLoad(() => import('./components/dashboard/Dashboard')))
const AsyncPosts = Loadable(doLoad(() => import('./components/posts/Posts')))
const AsyncPost = Loadable(doLoad(() => import('./components/post/Post')))




export default App;
