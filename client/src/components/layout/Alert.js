import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({alerts}) => {
    // console.log("Hallo"+alerts.msg);
    alert(alerts.msg);

    // <div id="example">
    // <div>
    //   <p>{alerts.msg}</p>
    // </div>
    // </div>
    // <div >{alerts.msg}</div>

    // <div className={`alert alert-${alerts.alertType}`}>{alerts.msg}</div>
    // alerts && alerts !== null && alerts.length >0 && alerts.map(alert => (
    //    
    // ))
}

const mapStateToProps = state =>({
    alerts:state.alert
})

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Alert);