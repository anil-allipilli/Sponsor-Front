import React from 'react'

const SponsorRegister = (props) => {
    return (
        <div>
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required></input>
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required></input>
            <label for="cfpsw"><b>Confirm Password</b></label>
            <input type="password" placeholder="Confirm Password" name="cfpsw" required></input>
            <label for="first_name"><b>First Name</b></label>
            <input type="text" placeholder="Enter first name" name="first_name" required></input>
            <label for="last_name"><b>Last Name</b></label>
            <input type="text" placeholder="Enter last name" name="last_name" required></input>
            <label for="email"><b>Email</b></label>
            <input type="email" placeholder="Enter email" name="email" required></input>
            <label for="bcf"><b>Birth Certificate</b></label>
            <input type="file" name="bcf" required></input>
            <label for="ni"><b>National ID</b></label>
            <input type="file" name="ni" required></input>            
        </div>
    )
}

export default SponsorRegister