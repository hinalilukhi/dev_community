import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({experience : {company, title, location, current, to, from, description}}) => {
  return (
    <div><h3 className='text-dark'>{company}</h3>
    <p>
        <Moment format=''>{from}</Moment>={' '}{to ? (<Moment format=''>{to}</Moment>): ' Now'}
    </p>
    <p>
        <strong>Position: </strong>{title}
    </p>
    <p>
        <strong>description: </strong>{description}
    </p>

    </div>
  )
}

ProfileExperience.propTypes = {
    experience:PropTypes.object.isRequired
}

export default ProfileExperience