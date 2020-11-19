import React, {useState} from 'react'

import api from "../axios"
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
        <div>
            <label>
                <b>Username:</b>
                <input 
                    type="text" 
                    placeholder="Enter Username" 

                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                ></input>
            </label>
            <label>
                <b>Password</b>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="psw"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                ></input>
            </label>
            <label>
                <b>Confirm Password</b>
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="cfpsw" 
                    value={confirmpassword} 
                    onChange={(e) => setConfirmpassword(e.target.value)} 
                    required
                ></input>
            </label>
            <label>
                <b>First Name</b>
                <input type="text" 
                    placeholder="Enter first name" 
                    name="first_name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                ></input>
            </label>
            <label>
                <b>Last Name</b>
                <input type="text" 
                    placeholder="Enter last name" 
                    name="last_name"
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required
                ></input>
            </label>
            <label>
                <b>Email</b>
                <input type="email" 
                placeholder="Enter email" 
                name="email"             
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                ></input>            
            </label>







            <button onClick={registerHandler} type="submit">Register</button>            
        </div>
    )
}

export default SponserRegister