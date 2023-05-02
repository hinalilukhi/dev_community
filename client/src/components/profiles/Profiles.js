import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { getProfiles } from '../../actions/profile'
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
const Profiles = ({ getProfiles, profile: {profiles, loading} }) => {
    useEffect(()=>{
        getProfiles();
    },[getProfiles]);
  return (
    <div className='container'>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with developers
        </p>
        <div className='profiles'>
            {
                profiles.length>0 ? (profiles.map(profile=>(
                    <ProfileItem key={profile._id} profile={profile}></ProfileItem>
                ))):(<h4>No Profile found</h4>)
            }
        
    </div>
    </div>
    
  )
}

Profiles.propTypes = {
    profile:PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)