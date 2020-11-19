import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import About from "./components/About"
import Register from "./components/Register"
import SponseeRegister from "./components/SponseeRegister"
import SponsorRegister from "./components/SponsorRegister"
import SchoolInfo from "./components/SchoolInfo"
import Reason from "./components/Reason"

import SponseesList from "./components/SponseesList"
import SponseeDetail from "./components/SponseeDetail"


function App() {
  return (
    <Router>
      <div className="App">
        <h2>Sponsor</h2>
        <Navbar />
        <Switch>
          <Route path="/about"><About/></Route>
          <Route path="/login"><Login/></Route>
          {/* <Route path="/register"><Register/></Route> */}
          <Route path="/register"><SponseeRegister/></Route>
          <Route path="/sponsor-register"><SponsorRegister/></Route>
          <Route path="/school"><SchoolInfo/></Route>
          <Route path="/reason"><Reason/></Route>
          <Route path="/sponsees-list"><SponseesList/></Route>
          <Route path="/sponsee-detail"><SponseeDetail/></Route>
          <Route path="/"><Login/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
