import React, {Component} from 'react'
import classnames from 'classname'
import {connect} from 'react-redux'
import PropsType from 'prop-types'
// import registerUser from './../../reduucers/authReducer'
import {registerUser} from './../../actions/authActions'
import axios from "axios/index";
class Register extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
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
    // console.log(this.props.registerUser)
    axios.post('api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
    // this.props.registerUser(newUser)
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

Register.propType = {
  registerUser : PropsType.func.isRequired,
  auth: PropsType.object.isRequired,
  errors: PropsType.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, {registerUser})(Register)