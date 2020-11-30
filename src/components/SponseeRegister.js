import React, {useState} from 'react'

import api from "../axios"
import { useHistory } from "react-router-dom";
import "../css/SponseeRegister.css"

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
    const registerHandler = async (e) => {
        e.preventDefault()
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
            // eslint-disable-next-line
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
        <form className="RegisterSponseeBox" onSubmit={registerHandler}>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Username</b>
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

            <label className="RegisterUnit">
                <b className="RegisterLabel">Address</b>
                <input 
                className="RegisterInput"type="text" 
                placeholder="Enter Address" 
             
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
            ></input>
            </label>

            <label className="RegisterUnit">
                <b className="RegisterLabel">Phone</b>
                <input 
                className="RegisterInput"type="number" 
                placeholder="Enter phone" 
             
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required
                ></input>
            </label>

            <label className="RegisterUnit">
                <b className="RegisterLabel">Birth Certificate</b>
                <input 
                className="RegisterInput"
                type="file" 

                onChange={(e) => setBirthCertificate(e.target.value)}  
                required
            ></input>
            </label>

            <label className="RegisterUnit">
                <b className="RegisterLabel">National ID</b>
                <input 
                className="RegisterInput"
                type="file"   

                onChange={(e) => setNationalId(e.target.value)} 
                required
                ></input>
            </label>


            <button className="RegisterButton"  type="submit">Register</button>            
        </form>
    )
}

export default SponseeRegister