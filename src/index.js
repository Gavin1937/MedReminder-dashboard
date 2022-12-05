import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// other components
import AddMed from './component/AddMed';
import AddUser from './component/AddUser';
import Home from './component/Home';
import ListPatient from './component/ListPatient';
import Login from './component/Login';
import MedHistory from './component/MedHistory';
import MedInfo from './component/MedInfo';
import SearchMed from './component/SearchMed';
import PatientInfo from './component/PatientInfo';
import SearchPatient from './component/SearchPatient';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={ <Navigate to="/home" /> } />
      <Route exact path="/home" element={ <Home /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/listpatient" element={ <ListPatient /> } />
      <Route exact path="/searchpatient" element={ <SearchPatient /> } />
      <Route exact path="/patientinfo/:id" element={ <PatientInfo /> } />
      <Route exact path="/adduser/:id" element={ <AddUser /> } />
      <Route exact path="/medhistory" element={ <MedHistory /> } />
      <Route exact path="/medinfo/:id" element={ <MedInfo /> } />
      <Route exact path="/addmed" element={ <AddMed /> } />
      <Route exact path="/searchmed" element={ <SearchMed /> } />
    </Routes>
  </Router>
);


