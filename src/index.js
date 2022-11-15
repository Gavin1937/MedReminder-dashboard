import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './Home';
import ListUser from './ListUser';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={ <Navigate to="/home" /> } />
      <Route exact path="/home" element={ <Home /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/user" element={ <ListUser /> } />
    </Routes>
  </Router>
);
