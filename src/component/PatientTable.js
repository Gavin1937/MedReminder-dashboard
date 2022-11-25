import { Component } from 'react';
import '../css/Table.css';


class PatientTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      elem: null,
      ready: false
    };
    
    this.genPatientTable = this.genPatientTable.bind(this);
  }
  
  componentDidMount() {
    this.genPatientTable();
  }
  
  isEmptyUser = (user) => {
    return ( user.role === "norole" );
  }
  
  genPatientTable = () => {
    let array = [];
    for (const patient of this.props.payload.patients) {
      let name = patient.pat_info.fname + " " + patient.pat_info.lname;
      array.push(
        <tr key={patient.pat_info.id}>
          <td>{patient.pat_info.id}</td>
          <td>
            <a href={`/patientinfo/${patient.pat_info.id}`} >
              {name}
            </a>
          </td>
          <td>
            {this.isEmptyUser(patient) ? <a href={`/adduser/${patient.pat_info.id}`} >Add User</a> : <span>{" "}</span>}
          </td>
        </tr>
      );
    }
    
    const prev_page = this.props.prev_page;
    const next_page = this.props.next_page;
    let isEmpty = (page) => { return (page === undefined || page === null); }
    this.setState({elem: (
      <div className="Table">
        <h1>User</h1>
        <table>
          <thead>
            <tr key="Title">
              <th>ID</th>
              <th>Name</th>
              <th>Add User</th>
            </tr>
          </thead>
          <tbody>{array}</tbody>
        </table>
        <div className="PageLink">
          {isEmpty(prev_page) ? <p>{' '}</p> : <a style={{paddingLeft:"8%"}} onClick={this.clearPatientTable} href={prev_page}>Previous Page</a>}
          {isEmpty(next_page) ? <p>{' '}</p> : <a style={{paddingLeft:"8%"}} onClick={this.clearPatientTable} href={next_page}>Next Page</a>}
        </div>
      </div>
    ), ready: true});
  }
  
  clearPatientTable = () => {
    document.querySelector("Table").remove();
    document.querySelector("PageLink").remove();
  }
  
  render() {
    return (
      <div className="PatientTable">
        {(this.state.ready) ? this.state.elem : null}
      </div>
    );
  }
  
}

export default PatientTable;