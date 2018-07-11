import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProfile} from './../../actions/profileAction'
import Spinner from './../common/Spinner'
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }
  render() {
    const {user} = this.props.auth
    const {profile, loading} = this.props.profile
    let dashboardContent
    if (profile === null || loading) {
      dashboardContent = <Spinner/>
    } else {
      //Check if loged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1>Display Profile </h1>
      } else {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p className='lead text-muted'>You have not setup a profile, please add some info</p>
            <Link to='create-profile' className='btn btn-lg btn-info'>
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return(
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

const mapDispatchToProps = dispatch => {
  return {
    ...getProfile(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)