import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { setPassword } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import {connect} from 'react-redux'
import { useParams } from 'react-router-dom';


const SetPassword = ({setPassword, setAlert}) => {
    const [Formdata, setFormdata]=useState({
        password:''
    });
    const {  password }= Formdata;
    const onChange = e => setFormdata({...Formdata, [e.target.name]: e.target.value});
    const { userId, token } = useParams();

    const onSubmit = async(e) => {
        e.preventDefault();
        if(password){
            setPassword(userId,token,password);
            setAlert("New password set successfully, Please Log in","success");
            return <Redirect to="/login"></Redirect>
        }
        else
        setAlert("Invalid Credentials","danger");
    }
  return (
    <div className='container'>
   
        <h1 className="large text-primary">Reset Password</h1>
      <p className="lead"><i className="fas fa-user"></i> SignIn To Your Account</p>
      <form className="form" method='post' onSubmit={e=>onSubmit(e)}>
    
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
      
        <input type="submit" className="btn btn-primary" value="Reset password"  />
      </form>
      <p className="my-1">
        Already know the password? <Link to="/login">Sign In</Link>
        </p>
    <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>   
        </div>  
    
  )
}

SetPassword.propTypes = {}

export default connect(null, {setPassword, setAlert})(SetPassword)