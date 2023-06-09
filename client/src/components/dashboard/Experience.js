import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { deleteExperience } from '../../actions/profile'
const Experience = ({experience, deleteExperience}) => {
    const experiences= experience.map(exp =>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.company}</td>
            <td><Moment format='YYYY/MM/DD' >{exp.from}</Moment> -
            {' '}
            {exp.to === null ?(' Now') :
            (<Moment format='YYYY/MM/DD' >{exp.to}</Moment>)
           }
            </td>
            <td>
                <button className='btn btn-danger' onClick={()=>deleteExperience(exp._id)}>Delete</button>
            </td>
        </tr>
    ))
  return (
    <div className='container'>
    <h2 className='my-2'>Experience Credntials</h2>    
    <table className='table'>
    <tr>
        <th>Company</th>
        <th className='hide-sm'>Title</th>
        <th className='hide-sm'>Years</th>
        <th />
    </tr>
    <tbody>{experiences}</tbody>
    </table>
    </div>
  )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null,{deleteExperience})(Experience)