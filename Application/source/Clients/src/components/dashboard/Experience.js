import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'

class Experience extends Component {
  render() {
    const experiecnce = this.props.experiecnce
            console.log("DataExp", experiecnce)
    //   const experiecnce = this.props.experiecnce.map(exp => 
    //     console.log("Data", exp)
    //     (  
    //       <tr key={exp.id}>
    //       <td>{exp.company}</td>
    //       <td>{exp.title}</td>
    //       <td>{exp.from}</td> - <td>{exp.to}</td>
    //       <td><button className="btn btn-danger">Delete</button></td>
    //       </tr>
    //   ))
    return (
    //   <div>
    //     <h4 className="mb-4">Experience Credentials</h4>
    //     <table className="table">
    //         <thead>
    //             <tr>
    //                 <th>Company</th>
    //                 <th>Title</th>
    //                 <th>Years</th>
    //                 <th></th>
    //             </tr>
    //             <tbody>
    //                 {experiecnce}
    //             </tbody>
    //         </thead>
    //     </table>
    //   </div>
    <div></div>
    )
  }
}

export default  connect(null)(withRouter(Experience));