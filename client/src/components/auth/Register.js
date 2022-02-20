import React, { useState } from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from './../common/TextFieldGroup'

const Register = ({ setAlert, onSignUp, isAuthenticated, history, errors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>{
    const {name, value} = e.target
     setFormData({ ...formData, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    onSignUp({ name, email, password, password2 }, history)
  };

  if (isAuthenticated) {
    this.props.history.push('/dashboard')
  }

  return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center '> Sign Up</h1>
              <p className='lead text-center'> Create your account</p>
              <form noValidate onSubmit={onSubmit}>
                <TextFieldGroup
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={onChange}
                    error={errors.name}
                />
                <TextFieldGroup
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={onChange}
                    type='email'
                    error={errors.email}
                />
                <TextFieldGroup
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    type='password'
                    error={errors.password}
                />
                <TextFieldGroup
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    type='password'
                    error={errors.password2}
                />
                <input
                    type='submit'
                    className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    ...registerUser(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(withRouter(Register));
