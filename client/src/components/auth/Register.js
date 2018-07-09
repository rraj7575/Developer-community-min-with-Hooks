import React, {Component} from 'react'
import classnames from 'classname'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {registerUser} from './../../actions/authActions'

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  componentDidMount() {
    debugger
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, password2} = this.state
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    }
    this.props.onSignUp(newUser, this.props.history)
  }

  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  showErrors = (err) => (<div className='invalid-feedback'> {err}</div>)

  render(){
    const {name, email, password, password2, errors} = this.state
    return(
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center '> Sign Up</h1>
              <p className='lead text-center'> Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                   type='text'
                   className={classnames('form-control form-control-lg', {
                     'is-invalid': errors.name
                   })}
                   placeholder='Name'
                   name='name'
                   value={name}
                   onChange={this.onChangeInput}
                  />
                  {errors.name && this.showErrors(errors.name)}
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={this.onChangeInput}
                  />
                  {errors.email && this.showErrors(errors.email)}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={this.onChangeInput}
                  />
                  {errors.password && this.showErrors(errors.password)}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={this.onChangeInput}
                  />
                  {errors.password2 && this.showErrors(errors.password2)}
                </div>
                <input
                  type='submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    ...registerUser(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))