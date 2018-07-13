import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from './../../actions/profileAction'

class Education extends Component {

  onClickDeleteEducation = (id) => {
    this.props.onDeleteEducation(id)
  }

  render() {
    const education = this.props.education.map(edu => {
      return(
        <tr key={edu._id}>
          <td> {edu.school} </td>
          <td> {edu.degree} </td>
          <td>
            <Moment date={edu.from} format='YYYY/MM/DD'/>-
            {edu.to === null ? 'Now' : (<Moment date={edu.to} format='YYYY/MM/DD'/>)}
          </td>
          <td>
            <button className='btn btn-danger' onClick={() => this.onClickDeleteEducation(edu._id)} > Delete</button>
          </td>
        </tr>
      )
    })
    return(
      <div>
        <h4 className='mb-4'> Education Credentials </h4>
        <table className='table'>
          <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
          </tr>
          {education}
          </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  onDeleteEducation: PropTypes.func.isRequired
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

const mapDispatchToProps = dispatch => {
  return {
    ...deleteEducation(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Education)
