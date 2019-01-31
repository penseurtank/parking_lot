import React from "react";
import './table.css'

class Table extends React.Component {

  render() {
    return (
      <div>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>registrationNumber</th>
            <th>slot</th>
            <th>color</th>
          </tr>
          { !this.props.filter && this.props.vehicleDetails.length > 0 ? 
          (this.props.vehicleDetails.map((details,i) => <tr key={i} ><td><button type='button' onClick={e => this.props.removeSlot(details.slot)}>Remove</button></td><td>{details.registrationNumber}</td><td>{details.slot}</td><td>{details.color}</td></tr> ))
          :(this.props.filter && this.props.filteredVehicle.length>0) ?
            (this.props.filteredVehicle.map((details,i) => <tr key={i} ><td>{details.registrationNumber}</td><td>{details.slot}</td><td>{details.color}</td></tr>))
             : <h3>No data</h3>
            }
          </tbody>
        </table>
      </div>
    );
  }
}


export default Table;
