import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from './../../actions/profileAction'

class Experience extends Component {

  onClickDeleteExperience = (id) => {
     this.props.onDeleteExperience(id)
  }

  render() {
    const experience = this.props.experience.map(exp => {
      return(
        <tr key={exp._id}>
          <td> {exp.company} </td>
          <td> {exp.title} </td>
          <td>
            <Moment date={exp.from} format='YYYY/MM/DD'/>-
            {exp.to === null ? 'Now' : (<Moment date={exp.to} format='YYYY/MM/DD'/>)}
          </td>
          <td>
            <button className='btn btn-danger' onClick={() => this.onClickDeleteExperience(exp._id)} > Delete</button>
          </td>
        </tr>
        )
    })
    return(
      <div>
        <h4 className='mb-4'> Experience Credentials </h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Titles</th>
              <th>Years</th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  onDeleteExperience: PropTypes.func.isRequired
}


const mapDispatchToProps = dispatch => {
  return {
    ...deleteExperience(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Experience)
