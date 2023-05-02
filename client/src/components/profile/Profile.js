import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import { getProfileById } from './../../actions/profile';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({match, getProfileById, profile: {profile, loading}, auth}) => {
    useEffect(()=>{
        getProfileById(match.params.id)
    },[match.params.id,getProfileById]);

  return (
       
     <div className='container'>
     
     <Link className='btn btn-light' to="/profiles">Back To Profile</Link>
          {/* { profile ? (auth.isAuthenticated && auth.user._id === profile.user._id
       (<Link to="/edit-profile" className='btn btn-dark'>Edit Profile</Link>)):null
        }  */}

        <div className="profile-grid my-1">
     { profile ? (
    <Fragment>
      <div className="container-fluid">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile}/>
      </div>
    </Fragment>
  ) : null }
</div>
    { profile ? (<Fragment>
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Experience</h2>
        {profile.experience.length > 0 ? (<>{ profile.experience.map(exp =>
          <ProfileExperience key={exp._id} experience={exp}></ProfileExperience>
          )} </>): (<h4>No experience credential</h4>)}
      </div>
    </Fragment>): null}
       
    { profile ? (<Fragment>
      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'>Education</h2>
        {profile.education.length > 0 ? (<>{ profile.education.map(edu =>
          <ProfileEducation key={edu._id} education={edu}></ProfileEducation>
          )} </>): (<h4>No education credential</h4>)}
      </div>
    </Fragment>): null}

    { profile ? (<Fragment>
      {profile.githubusername && <ProfileGithub username={profile.githubusername}></ProfileGithub>}
    </Fragment>): null}
    </div>

  )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)