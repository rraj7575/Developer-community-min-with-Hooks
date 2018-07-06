import React, {Component} from 'react'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const user = {
      email: email,
      password: password,
    }
    console.log(user)
  }
  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    return(
     <div className='login'>
       <div className='container'>
         <div className='row'>
           <div className='col-md-8 m-auto'>
             <h1 className='display-4 text-center'>Log In</h1>
             <p className='lead text-center'> Sign in to your account</p>
             <form onSubmit={this.onSubmit}>
               <div className='form-gropu'>
                 <input
                   type='email'
                   className='form-control form-control-lg'
                   placeholder='Email Address'
                   name='email'
                   onChange={this.onChangeInput}
                 />
               </div>
               <div className='form-group'>
                 <input
                   type='passwor'
                   className='form-control form-control-lg'
                   placeholder='Password'
                   name='password'
                   onChange={this.onChangeInput}
                 />
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
export default Login