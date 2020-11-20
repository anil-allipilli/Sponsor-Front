import React from 'react'
import {Link} from "react-router-dom";

import "../css/Register.css"
const Register = (props) => {
    return (
        <div className="SelectCategoryBox">
            <Link className="Link1" to="/sponsee-register">I want to be Sponsored</Link>
            <Link className="Link2" to="/sponsor-register">I want to Sponsor</Link>           
        </div>
    )
}

export default Register