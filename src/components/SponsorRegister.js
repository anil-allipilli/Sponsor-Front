import React, {useState} from 'react'

import api from "../axios"
import "../css/SponsorRegister.css"
import { useHistory } from "react-router-dom";


const SponserRegister = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    let history = useHistory();
    const registerHandler = async () => {
        const registerFormData = new FormData()
        registerFormData.append("username", username)
        registerFormData.append("password", password)
        registerFormData.append("confirmpassword", confirmpassword)
        registerFormData.append("firstName", firstName)
        registerFormData.append("lastName", lastName)
        registerFormData.append("email", email)

        let res;
        try {
            res = await api({
                method: "post",
                url: "api/createsponser/",
                data: registerFormData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            console.log(res)
            history.push("/sponsees-list")
        } catch (err) {
            console.log(err)
        }
        console.log(res)
    }

    return (
        <form className="RegisterSponseeBox" onSubmit={registerHandler}>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Username:</b>
                <input 
                className="RegisterInput"
                    type="text" 
                    placeholder="Enter Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Password</b>
                <input 
                className="RegisterInput"
                    type="password" 
                    placeholder="Enter Password" 

                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Confirm Password</b>
                <input 
                className="RegisterInput"
                    type="password" 
                    placeholder="Confirm Password" 
 
                    value={confirmpassword} 
                    onChange={(e) => setConfirmpassword(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">First Name</b>
                <input 
                className="RegisterInput"type="text" 
                    placeholder="Enter first name" 
 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Last Name</b>
                <input 
                className="RegisterInput"type="text" 
                    placeholder="Enter last name" 

                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Email</b>
                <input 
                className="RegisterInput"type="email" 
                placeholder="Enter email" 
             
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                ></input>            
            </label>






            <button className="RegisterButton"  type="submit">Register</button>            
        </form>
    )
}

export default SponserRegister