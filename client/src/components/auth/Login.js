import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { login  } from '../../actions/auth'
import { setAlert } from '../../actions/alert'



const Login = ({login, isAuthenticated, setAlert}) => {
    const [Formdata, setFormdata]=useState({
        email:'',
        password:''
    });
    const {  email, password }= Formdata;
    const onChange = e => setFormdata({...Formdata, [e.target.name]: e.target.value});
    const onSubmit = async(e) => {
        e.preventDefault();
        if(!email&&!password)
        setAlert("Please enter email and password","danger")
        else
        {
        login(email,password);
        // setAlert("log in successfully", "success")
        }
    }
  
    if(isAuthenticated){
     return <Redirect to='/dashboard'/>
    }
    return (
    <>
    <div className='container'>
  
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> SignIn To Your Account</p>
      <form className="form" method='post' onSubmit={e=>onSubmit(e)}>

        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e=>onChange(e)} value={email}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
      
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <p className="my-1">
        Have you forgot password? <Link to="/reset-password">Reset password</Link>
      </p>
    </div>
    </>
  )
}

Login.prototypes={
  login:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, setAlert })(Login)