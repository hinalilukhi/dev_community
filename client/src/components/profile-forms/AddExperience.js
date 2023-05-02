import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { addExperiecne } from './../../actions/profile';
import { connect } from 'react-redux';
const AddExperience = ({history, addExperiecne}) => {
  const [formData,setFormdata]=useState({
    company :'',
    title:'',
    location:'',
    from:'',
    to:'',
    current:false,
    description:''
  })

  const [toDateDisabled,toggleDisable]=useState(false);
  const {
    company,
    title,
    location,
    from,
    to,
    current,
    description
  }=formData;

  const onchange = e => setFormdata({...formData, [e.target.name]:e.target.value})
  return (
    <div className='container'><h1 class="large text-primary">
    Add An Experience
   </h1>
   <p class="lead">
     <i class="fas fa-code-branch"></i> Add any developer/programming
     positions that you have had in the past
   </p>
   <small>* = required field</small>
   <form class="form" onSubmit={e=>{
    e.preventDefault();
    addExperiecne(formData,history);
   }} >
     <div class="form-group">
       <input type="text" placeholder="* Job Title" name="title" 
       onChange={e=>onchange(e)} value={title}
       required />
     </div>
     <div class="form-group">
       <input type="text" placeholder="* Company" name="company" 
       onChange={e=>onchange(e)} value={company}
       required />
     </div>
     <div class="form-group">
       <input type="text" placeholder="Location" name="location"
       onChange={e=>onchange(e)} value={location}
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
       /> {' '}Current Job</p>
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
         placeholder="Job Description"
         onChange={e=>onchange(e)} value={description}
       ></textarea>
     </div>
     <input type="submit" class="btn btn-primary my-1" />
     <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
   </form></div>
  )
}

AddExperience.propTypes = {
    addExperiecne:PropTypes.func.isRequired
}

export default connect(null,{addExperiecne})(withRouter(AddExperience));