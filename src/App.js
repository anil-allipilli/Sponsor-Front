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
function App() {
  return (
    <Router>
      <div className="App">
        <h2>Sponsor</h2>
        <Navbar />
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
