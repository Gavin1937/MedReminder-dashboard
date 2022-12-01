import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/Table.css';


class MedHistory extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      elem: null,
      ready: false
    };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getMedHistory = this.getMedHistory.bind(this);
  }
  
  componentDidMount = () => {
    this.getMedHistory();
  }
  
  getMedHistory = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    
    let search = new URLSearchParams(window.location.search);
    let uid = search.get("uid");
    let mid = search.get("mid");
    let path = `/api/medication/history?user_id=${uid}&med_id=${mid}&med_id_opt=eq`
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let payload = data.payload;
        let array = []
        for (let i = 0; i < payload.length; ++i) {
          let time = new Date(parseInt(payload.at(i).med_time) * 1000)
          let year = String(time.getFullYear()).padStart(4,"0");
          let month = String(time.getMonth()).padStart(2,"0");
          let day = String(time.getDay()).padStart(2,"0");
          let hour = String(time.getHours()).padStart(2,"0");
          let min = String(time.getMinutes()).padStart(2,"0");
          let sec = String(time.getSeconds()).padStart(2,"0");
          let timestr = `${year}/${month}/${day} ${hour}:${min}:${sec}`;
          array.push(
            <tr key={i}>
              <td>{payload.at(i).id}</td>
              <td>{payload.at(i).user_id}</td>
              <td>{payload.at(i).med_id}</td>
              <td>{timestr}</td>
            </tr>
          );
        }
        let elem = (
          <div>
            <h1>Medication History</h1>
            <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Medication Id</td>
                  <td>User Id</td>
                  <td>Medication Time</td>
                </tr>
              </thead>
              <tbody>
                {array}
              </tbody>
            </table>
          </div>
        );
        this.setState({elem: elem, ready: true});
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    if (Cookies.get("username") === undefined) {
      return (
        <Navigate to="/login" />
      );
    }
    else {
      return (
        <div className="MedicationHistory">
          {(this.state.ready) ? this.state.elem : null}
        </div>
      );
    }
  }
  
}

export default MedHistory;