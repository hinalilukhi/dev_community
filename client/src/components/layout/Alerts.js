import Alert from 'react-bootstrap/Alert';
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

function BasicExample({alerts}) {
  return (
    // eslint-disable-next-line react/style-prop-object
    <div className='alrt' >
     <Alert  variant={`${alerts.alertType}`}>
         {alerts.msg}
        </Alert>
      </div>
  );
}

const mapStateToProps = state =>({
    alerts:state.alert
})

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(BasicExample);