import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';


class AddMed extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mid: null,
      ready: false
    };
    
    this.doAddMed = this.doAddMed.bind(this);
  }
  
  componentDidMount() {
    
  }
  
  doAddMed = (e) => {
    e.preventDefault();
    let parent = document.querySelector("div.AddMed");
    let name = document.querySelector("div.AddMed input#name").value;
    let desc = document.querySelector("div.AddMed input#description").value;
    let freq = parseInt(document.querySelector("div.AddMed input#frequency").value);
    let early = parseInt(document.querySelector("div.AddMed input#early_time").value);
    let late = parseInt(document.querySelector("div.AddMed input#late_time").value);
    for (let c of parent.children) {
      c.remove();
    }
    
    let body = {
      name: name,
      description: desc,
      frequency: freq,
      early_time: early,
      late_time: late
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      },
      body: JSON.stringify(body)
    };
    
    let path = `/api/medication`;
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let mid = data.payload.id;
        if (data.ok)
          this.setState({mid: mid, ready: true});
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
    else if (this.state.ready === false) {
      return (
        <div className="AddMed">
          <h1>Add Medication</h1>
          <h3><a href="/searchmed">Search & Manage Medication</a></h3>
          <form onSubmit={this.doAddMed}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" />
            <label htmlFor="frequency">Frequency</label>
            <input type="text" id="frequency" />
            <label htmlFor="early_time">Early Time</label>
            <input type="text" id="early_time" />
            <label htmlFor="late_time">Late Time</label>
            <input type="text" id="late_time" />
            <input type="submit" />
          </form>
        </div>
      );
    }
    else if (this.state.ready === true) {
      window.location = `/medinfo/${this.state.mid}`;
    }
  }
  
}

export default AddMed;