import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
// import { USER_LOADED } from './../../actions/Types';



 const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {
 
  
  const authLinks=(
    <ul>
      <li>
        <Link to="/profiles">
       Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">
       Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
        <i className='fas fa-user'/>{' '}<span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
        <li><a onClick={logout} href='/login'><i className='fas fa-sign-out-alt'></i>{' '}
        <span className='hide-sm'>LogOut</span>
        </a></li>
      </ul>
  );
  const guestLink=(<ul>
    <li>
        <Link to="/profiles">
        <i className='fas fa-user'/>{' '}<span className='hide-sm'>Developers</span>
        </Link>
      </li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevCommunity </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLink}</Fragment>
      )

      }
    </nav>
  )
}
Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  auth:state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)