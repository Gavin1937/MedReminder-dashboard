import { Component } from 'react';

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import LoadingPage from './LoadingPage';


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
      let emptyStat = this.isEmptyUser(patient);
      array.push(
        <tr key={patient.pat_info.id}>
          <td>{patient.pat_info.id}</td>
          <td>
            <a href={`/patientinfo/${emptyStat ? 'p'+patient.pat_info.id : 'u'+patient.id}`} >
              {name}
            </a>
          </td>
          <td>
            {emptyStat ? <a href={`/adduser/${patient.pat_info.id}`} >Add User</a> : <span>{"In System"}</span>}
          </td>
        </tr>
      );
    }
    
    const prev_page = this.props.prev_page;
    const next_page = this.props.next_page;
    let isEmpty = (page) => { return (page === undefined || page === null); }
    this.setState({elem: (
      <div className="Table">
        <Container>
          <Row className="h-100 d-flex align-items-center justify-content-center">
            <Card>
              <Card.Title className="m-2" style={{fontSize:"x-large",fontWeight:"bold"}}>
                Patient Table
              </Card.Title>
              <Table striped bordered hover className="m-2">
                <thead>
                  <tr key="Title">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Add User</th>
                  </tr>
                </thead>
                <tbody>{array}</tbody>
              </Table>
              <div className="PageLink">
                {isEmpty(prev_page) ? <p>{' '}</p> : <a className="btn btn-primary m-2" onClick={this.clearPatientTable} href={prev_page}>Previous Page</a>}
                {isEmpty(next_page) ? <p>{' '}</p> : <a className="btn btn-primary m-2" onClick={this.clearPatientTable} href={next_page}>Next Page</a>}
              </div>
            </Card>
          </Row>
        </Container>
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
        {(this.state.ready) ? this.state.elem : <LoadingPage />}
      </div>
    );
  }
  
}

export default PatientTable;