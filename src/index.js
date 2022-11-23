import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './component/Home';
import ListPatient from './component/ListPatient';
import Login from './component/Login';
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
    </Routes>
  </Router>
);


