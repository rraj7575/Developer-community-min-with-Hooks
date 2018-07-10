import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {loginUser} from "../../actions/authActions";
import {getCurrentProfile} from './../../actions/profileAction'
class Dashboard extends Component {
  componentDidMount() {

  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return {
    ...loginUser(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)