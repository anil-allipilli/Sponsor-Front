import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './css/App.css';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import About from "./components/About"
import Register from "./components/Register"
import SponseeRegister from "./components/SponseeRegister"
import SponsorRegister from "./components/SponsorRegister"
import SchoolInfo from "./components/SponseeEdit/SchoolInfo"
import Reason from "./components/SponseeEdit/Reason"
import UserProfileEdit from "./components/UserProfileEdit"
import SponseesList from "./components/SponseesList"
import SponseeDetail from "./components/SponseeDetail"
import PhoneEdit from "./components/SponseeEdit/PhoneEdit"
import SchoolEdit from "./components/SponseeEdit/SchoolEdit"
import UploadBirth from "./components/SponseeEdit/UploadBirth"
import UploadNID from "./components/SponseeEdit/UploadNID"


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">        
        
        <Switch>
          <Route path="/about"><About/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/sponsee-register"><SponseeRegister/></Route>
          <Route path="/sponsor-register"><SponsorRegister/></Route>
          <Route path="/school"><SchoolInfo/></Route>
          <Route path="/reason"><Reason/></Route>
          <Route path="/sponsees-list"><SponseesList/></Route>
          <Route path="/sponsee-edit"><UserProfileEdit/></Route>
          <Route path="/phone-edit"><PhoneEdit/></Route>
          <Route path="/school-edit"><SchoolEdit/></Route>
          <Route path="/bc-edit"><UploadBirth/></Route>
          <Route path="/nid-edit"><UploadNID/></Route>
          <Route path="/sponsee-detail"><SponseeDetail/></Route>
          <Route path="/"><Login/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
