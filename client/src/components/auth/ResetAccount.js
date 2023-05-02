import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { sendEmail, setPassword } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import {connect} from 'react-redux'
const ResetAccount = ({sendEmail, setAlert}) => {
    const [Formdata, setFormdata]=useState({
        email:'',
    });
    const {  email }= Formdata;
    const onChange = e => setFormdata({...Formdata, [e.target.name]: e.target.value});
   
    const onSubmit = async(e) => {
        e.preventDefault();
        if(email){
            sendEmail(email);
            setAlert("Email sent successfully","success");
        }
        else
        setAlert("Invalid Credentials","danger");
    }
    
      
  return (
    <>
    <div className='container'>
   
        <h1 className="large text-primary">Reset Password</h1>
      <p className="lead"><i className="fas fa-user"></i> SignIn To Your Account</p>
      <form className="form" method='post' onSubmit={e=>onSubmit(e)}>
    
      
      <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" onChange={e=>onChange(e)} value={email}/>
      </div>
      
        <input type="submit" className="btn btn-primary" value="Reset password"  />
      </form>
      <p className="my-1">
        Already know the password? <Link to="/login">Sign In</Link>
        </p>
    <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>   
        </div>  
    </>
  )
}

ResetAccount.propTypes = {
    login:PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    // setPassword : PropTypes.func.isRequired
}

export default connect(null, {sendEmail, setAlert, setPassword})(ResetAccount)