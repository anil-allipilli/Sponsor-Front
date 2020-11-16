import React from "react";
import {

  Link
} from "react-router-dom";
function Navbar() {
    return (
      <div className="Navbar">
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
      </div>
    );
  }
  
  export default Navbar;