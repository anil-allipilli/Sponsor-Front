import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

import api from "../axios"
import "../css/Login.css"
const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const loginHandler = async (e) => {
        e.preventDefault();
        const loginFormData = new FormData()
        loginFormData.append("username", username)
        loginFormData.append("password", password)
        let res;
        try {
            res = await api({
                method: "post",
                url: "api/token/",
                data: loginFormData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            history.push("/sponsee-detail")
        } catch (err) {
            console.log(err)
        }
        console.log(res)
    }
    return (
        <form className="LoginBox" onSubmit={loginHandler}>
            <label className="InputUnit" >
                <b className="Label">Username:</b>
                <input 
                className="Input" 
                type="text" 
                placeholder="Enter Username" 
                
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
                ></input>
            </label>
            <label className="InputUnit" >
                <b className="Label">Password:</b>
                <input 
                className="Input" 
                type="password" 
                placeholder="Enter Password" 

                value={password} 
                onChange={(e) => setPassword(e.target.value)}             
                required></input>
            </label>

            <button className="LoginButton"  type="submit">Login</button>            
        </form>
    )
}

export default Login