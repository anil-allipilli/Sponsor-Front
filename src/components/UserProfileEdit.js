import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import api from "../axios"
import "../css/SponseeDetail.css"
import {Link} from "react-router-dom";
import { Pencil } from 'react-bootstrap-icons';

const UserProfileEdit = (props) => {
    let res
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState(""); 

    let history = useHistory();
    let user_type = localStorage.getItem("user")
    if(user_type === "sponser") history.push("/sponsees-list")
    let token = localStorage.getItem("access")
    console.log(token)
    let edit = <Pencil/>
    const submitHandler = async (e) => {
        e.preventDefault()
        const editSponseeProfileForm = new FormData()
        editSponseeProfileForm.append("username", username)
        editSponseeProfileForm.append("first_name", firstName)
        editSponseeProfileForm.append("last_name", lastName)
        editSponseeProfileForm.append("email", email)   


        let res;
        try {
            res = await api({
                method: "patch",
                url: "myuserprofile/",
                data: editSponseeProfileForm,
                headers: {'Authorization': `Bearer ${token}`}
            })
            console.log(res)
            history.push("/sponsee-detail")
        } catch (err) {
            console.log(err)
        }
        console.log(res)
    }


    useEffect(() => {        
        async function fetchdata() {
            try {
                res = await api.get(
                    "mysponseeprofile/", 
                    { headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res.data)
                setFirstName(res.data.user.first_name)
                setLastName(res.data.user.last_name)
                setUserName(res.data.user.username)
                setEmail(res.data.user.email)
                if(res.data.phone !== null)setPhone(res.data.phone)

            } catch(err) {
                console.log(err)
                if(err.response.status === 401) {
                    history.push("/login")
                }
            }
        }
        fetchdata()
    }, [])
    return (
        <form className="DetailBox"  onSubmit={submitHandler}>            
            <div className="Unit">
                <div className="DetailLabel">First name:</div>
                <input className="Value" onChange={(e) => setFirstName(e.target.value)}  value={firstName}></input>                
            </div>
            <div className="Unit">
                <div className="DetailLabel">Last name:</div>
                <input className="Value" onChange={(e) => setLastName(e.target.value)}  value={lastName}></input>                
            </div>
            <div className="Unit">
                <div className="DetailLabel">Username:</div>
                <input className="Value" onChange={(e) => setUserName(e.target.value)}  value={username}></input>                
            </div>
            <div className="Unit">
                <div className="DetailLabel">Email:</div>
                <input className="Value" onChange={(e) => setEmail(e.target.value)}  value={email}></input>                
            </div>

   


            <button className="RegisterButton"  type="submit">Submit</button>
        </form>
    )
}

export default UserProfileEdit