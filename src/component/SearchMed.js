import { Component } from 'react'
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';

class SearchPatient extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      payload: null,
      searchFail: false,
      ready: false
    };
    
    this.doSearch = this.doSearch.bind(this);
  }
  
  doSearch = async (e) => {
    e.preventDefault();
    
    let form = document.querySelector("form#search-form");
    
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    let searchParam = {
      name: form.querySelector("#name").value,
      frequency: parseInt(form.querySelector("#frequency").value),
      early_time: parseInt(form.querySelector("#early_time").value),
      late_time: parseInt(form.querySelector("#late_time").value)
    };
    fetch(`/api/medication/find?${new URLSearchParams(searchParam)}`, requestOptions)
    .then(response => response.json())
    .then((data) => {
      let payload = data.payload;
      if (data.ok)
        this.setState({ payload: payload, searchFail: false, ready: true });
      else
        this.setState({ payload: null, searchFail: true, ready: false});
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
      if (this.state.ready === false) {
        return (
          <div className="SearchMed">
            <h1><a href="/home">Home</a></h1>
            <h1><a href="/addmed">Add Medication</a></h1>
            {(this.state.searchFail) ? <h1 style={{color:"red"}}>Cannot find any Medication match the search parameter.</h1> : null}
            <label htmlFor="search-form">Search Medication</label>
            <form id="search-form" onSubmit={this.doSearch}>
              <label htmlFor="name">Name</label>
              <input id="name" type="text"/>
              <label htmlFor="frequency">Frequency</label>
              <input id="frequency" type="text"/>
              <label htmlFor="early_time">Early Time</label>
              <input id="early_time" type="text"/>
              <label htmlFor="late_time">Late Time</label>
              <input id="late_time" type="text"/>
              <input id="search-sbm" type="submit" value="Search" />
            </form>
          </div>
        );
      }
      else if (this.state.ready === true && this.state.searchFail === false) {
        return (
          <div className="searchMed">
            <h1><a href="/home">Home</a></h1>
            <h1><a href="/addmed">Add Medication</a></h1>
            <h1><a href="/searchmed">Search Again</a></h1>
            <h1>Medication Information</h1>
            <h3>Id: {this.state.payload.id}</h3>
            <h3>Name: {this.state.payload.name}</h3>
            <h3>Description: {this.state.payload.description}</h3>
            <h3>Frequency: {this.state.payload.frequency}</h3>
            <h3>Early Time: {this.state.payload.early_time}</h3>
            <h3>Late Time: {this.state.payload.late_time}</h3>
          </div>
        );
      }
    }
  }
  
}

export default SearchPatient;