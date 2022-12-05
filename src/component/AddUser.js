import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';


class AddUser extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      ready: false
    };
    
    this.doAddUser = this.doAddUser.bind(this);
  }
  
  componentDidMount() {
    
  }
  
  doAddUser = (e) => {
    e.preventDefault();
    let parent = document.querySelector("div.AddUser");
    let medElem = document.querySelector("div.AddUser input#med");
    let pwdElem = document.querySelector("div.AddUser input#password");
    
    let id = window.location.pathname.split("/").at(-1);
    id = parseInt(id);
    let med = medElem.value;
    med = parseInt(med);
    let password = pwdElem.value;
    for (let c of parent.children) {
      c.remove();
    }
    let body = {
      hospital_id: id,
      med_id: med,
      password: password,
      role: "patient"
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
    
    let path = `/api/user`;
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let uid = data.payload.id;
        if (data.ok)
          this.setState({uid: uid, ready: true});
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
        <div className="AddUser">
          <form onSubmit={this.doAddUser}>
            <label htmlFor="med">Medication</label>
            <input type="text" id="med" />
            <label htmlFor="password">Password</label>
            <input type="text" id="password" />
            <input type="submit" />
          </form>
        </div>
      );
    }
    else if (this.state.ready === true) {
      window.location = `/patientinfo/u${this.state.uid}`;
    }
  }
  
}

export default AddUser;