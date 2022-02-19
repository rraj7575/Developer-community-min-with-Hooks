import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Loadable from 'react-loadable'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
// import Register from './components/auth/Register'
// import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authActions'
import store from './store/store'
import {clearCurrentProfile} from "./actions/profileAction";
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import Chat from './components/chat/Chat'
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
              <Route path='/register' exact
                     render={ (props) => <AsyncRegister {...props} /> } />
              {/*<Route exact path='/register' component={Register} />*/}
              <Route path='/login' exact
                     render={ (props) => <AsyncLogin {...props} /> } />
              <Route path='/profiles' exact
                     render={ (props) => <AsyncProfiles {...props} /> } />
              {/*<Route exact path='/login' component={Login} />*/}
              {/*<Route exact path='/profiles' component={Profiles} />*/}
              <Route exact path='/profile/:handle' component={Profile} />
              <Switch>
                <PrivateRoute path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute path='/create-profile' component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path='/edit-profile' component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path='/add-experience' component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute path='/add-education' component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute path='/feed' component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute path='/chat' user={store.auth} component={Chat} />
              </Switch>
              <Switch>
                <PrivateRoute path='/post/:id' component={Post} />
              </Switch>
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    )
  }
}
const AsyncRegister = Loadable(doLoad(() => import('./components/auth/Register')))
const AsyncLogin = Loadable(doLoad(() => import('./components/auth/Login')))
const AsyncProfiles = Loadable(doLoad(() => import('./components/profiles/Profiles')))


export default App;
