import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from "../../actions/authActions";
import TextFieldGroup from './../common/TextFieldGroup'

const Login = ({errors, isAuthenticated, onLogin, history}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;
    const onChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        }
        onLogin(userData)
    };

    if (isAuthenticated) {
        history.push('/dashboard')
    }

    const {location} = history
    const {state} = location
    return (
        <div className='login'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        {state &&
                        <div style={{padding: '5px'}} className='alert-success text-center'>{state.message}</div>}
                        <h1 className='display-4 text-center'>Log In</h1>
                        <p className='lead text-center'> Sign in to your account</p>
                        <form noValidate onSubmit={onSubmit}>
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

Login.propTypes = {
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => {
    return {
        ...loginUser(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
