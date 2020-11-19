import React, {useState} from 'react'

import api from "../axios"
import { useHistory } from "react-router-dom";


const SponseeRegister = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [birthCertificate, setBirthCertificate] = useState("");
    const [nationalId, setNationalId] = useState("");
    let history = useHistory();
    const registerHandler = async () => {
        const registerFormData = new FormData()
        registerFormData.append("username", username)
        registerFormData.append("password", password)
        registerFormData.append("confirmpassword", confirmpassword)
        registerFormData.append("firstName", firstName)
        registerFormData.append("lastName", lastName)
        registerFormData.append("email", email)
        registerFormData.append("address", address)
        registerFormData.append("phone", phone)
        registerFormData.append("birthCertificate", birthCertificate)
        registerFormData.append("nationalId", nationalId)
        let res;
        try {
            res = await api({
                method: "post",
                url: "api/createsponsee/",
                data: registerFormData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            console.log(res)
            history.push("/login")
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

            <label>
                <b>Address</b>
                <input type="text" 
                placeholder="Enter Address" 
                name="address"             
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
            ></input>
            </label>

            <label>
                <b>Phone</b>
                <input type="number" 
                placeholder="Enter phone" 
                name="phone"             
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required
                ></input>
            </label>

            <label>
                <b>Birth Certificate</b>
                <input type="file" 
                name="bcf"
                value={birthCertificate} 
                onChange={(e) => setBirthCertificate(e.target.value)}  
                required
            ></input>
            </label>

            <label>
                <b>National ID</b>
                <input type="file"
                name="ni" 
                value={nationalId} 
                onChange={(e) => setNationalId(e.target.value)} 
                required
                ></input>
            </label>


            <button onClick={registerHandler} type="submit">Register</button>            
        </div>
    )
}

export default SponseeRegister