import React , {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from './../../actions/authActions'

class Navbar extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      window.location.href = '/dashboard'
    }
  }
  onLogout = (e) => {
    e.preventDefault()
    this.props.onLogout()
  }

  render() {
    const {isAuthenticated, user} = this.props.auth
    const authLink = (
      <ul className='navbar-nav ml-auto'>
        <li className= 'nav-item'>
          <a href='' onClick={this.onLogout} className='nav-link' >
            <img src={user.avatar} alt={user.name} className='rounded-circle' style={{marginRight: '5px', width: '25px'}}/>
            Logout
          </a>
        </li>
      </ul>
    )
    const guestLink = (
      <ul className='navbar-nav ml-auto'>
        <li className= 'nav-item'>
          <Link className='nav-link' to="/register" >
            Sign Up
          </Link>
        </li>
        <li className= 'nav-item'>
          <Link className='nav-link' to="/login" >
            Login
          </Link>
        </li>
      </ul>
    )
    return(
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className="container">
          <Link className='navbar-brand' to='/'> DevConnector</Link>
          {/*<button className='navbar-toggle' data-toggle="collapse" data-target="#mobile-nav">*/}
            {/*<span className='navbar-toggler-icon'> </span>*/}
          {/*</button>*/}
          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to= '/profile'>
                  Developer
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLink: guestLink}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    ...logoutUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)