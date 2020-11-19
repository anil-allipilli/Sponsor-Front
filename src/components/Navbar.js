import React from "react";
import {Link} from "react-router-dom";

import "../css/Navbar.css"

function Navbar() {
    return (
      <div className="NavBar"> 
        <div className="Logo">
          <Link className="Link" to="/">Sponsor</Link>
        </div>        
        <div className="Links">
            <Link className="Link" to="/about">About</Link>
            <Link className="Link" to="/login">Login</Link>
            <Link className="Link" to="/register">Register</Link>
        </div>
      </div>
    );
      

  }
  
  export default Navbar;