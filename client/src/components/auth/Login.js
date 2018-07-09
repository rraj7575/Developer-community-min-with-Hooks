import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import classnames from 'classname'
import {loginUser} from './../../actions/authActions'


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const userData = {
      email: email,
      password: password,
    }
    this.props.onLogin(userData)
  }

  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  showErrors = (err) => (<div className='invalid-feedback'> {err}</div>)

  render(){
    const {errors} = this.state
    return(
     <div className='login'>
       <div className='container'>
         <div className='row'>
           <div className='col-md-8 m-auto'>
             <h1 className='display-4 text-center'>Log In</h1>
             <p className='lead text-center'> Sign in to your account</p>
             <form noValidate onSubmit={this.onSubmit}>
               <div className='form-gropu'>
                 <input
                   type='email'
                   className={classnames('form-control form-control-lg', {
                     'is-invalid': errors.email
                   })}
                   placeholder='Email Address'
                   name='email'
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
                   onChange={this.onChangeInput}
                 />
                 {errors.password && this.showErrors(errors.password)}
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
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return {
    ...loginUser(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)