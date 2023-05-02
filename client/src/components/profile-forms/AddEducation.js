import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { addEducation } from './../../actions/profile';
import { connect } from 'react-redux';
const AddEducation = ({history, addEducation}) => {
  const [formData,setFormdata]=useState({
    school :'',
    degree:'',
    fieldofstudy:'',
    from:'',
    to:'',
    current:false,
    description:''
  })

  const [toDateDisabled,toggleDisable]=useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }=formData;

  const onchange = e => setFormdata({...formData, [e.target.name]:e.target.value})
  return (
    <div className='container'><h1 class="large text-primary">
    Add An Education
   </h1>
   <p class="lead">
     <i class="fas fa-code-branch"></i> Add any school or bootcamp experience that you have
   </p>
   <small>* = required field</small>
   <form class="form" onSubmit={e=>{
    e.preventDefault();
    addEducation(formData,history);
   }} >
     <div class="form-group">
       <input type="text" placeholder="* School or Bootcamp" name="school" 
       onChange={e=>onchange(e)} value={school}
       required />
     </div>
     <div class="form-group">
       <input type="text" placeholder="* Degree" name="degree" 
       onChange={e=>onchange(e)} value={degree}
       required />
     </div>
     <div class="form-group">
       <input type="text" placeholder="Field of Study" name="fieldofstudy"
       onChange={e=>onchange(e)} value={fieldofstudy}
       />
     </div>
     <div class="form-group">
       <h4>From Date</h4>
       <input type="date" name="from" onChange={e=>onchange(e)} value={from} />
     </div>
      <div class="form-group">
       <p><input type="checkbox" name="current" value={current} 
       onChange={e=>{
        setFormdata({...formData,current: !current})
        toggleDisable(!toDateDisabled)
      }
      }
       /> {' '}Current School</p>
     </div>
     <div class="form-group">
       <h4>To Date</h4>
       <input type="date" name="to" 
       onChange={e=>onchange(e)} value={to}
       disabled={toDateDisabled ? 'disabled':''}
       />
     </div>
     <div class="form-group">
       <textarea
         name="description"
         cols="30"
         rows="5"
         placeholder="Program Description"
         onChange={e=>onchange(e)} value={description}
       ></textarea>
     </div>
     <input type="submit" class="btn btn-primary my-1" />
     <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
   </form></div>
  )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
}

export default connect(null,{addEducation})(withRouter(AddEducation));