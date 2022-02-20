import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

const Landing = ({ isAuthenticated, history }) => {
  if (isAuthenticated) {
    history.push('/dashboard')
  }

  return (
      <div className= 'landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h1 className='display-3 mb-4' >
                  Developer Center
                </h1>
                <p className='lead'>
                  Create a developer profile and connect with other developers
                </p>
                <Link to='/register' className='btn btn-lg btn-info mr-2'> Sign Up</Link>
                <Link to='/login' className='btn btn-lg btn-light'> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(Landing));