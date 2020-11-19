import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

import api from "../axios"
const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const loginHandler = async () => {
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
        <div>
            <label for="uname"><b>Username</b></label>
            <input 
            type="text" 
            placeholder="Enter Username" 
            name="uname" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
            ></input>
            <label for="psw"><b>Password</b></label>
            <input 
            type="password" 
            placeholder="Enter Password" 
            name="psw" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}             
            required></input>

            <button onClick={loginHandler} type="submit">Login</button>            
        </div>
    )
}

export default Login