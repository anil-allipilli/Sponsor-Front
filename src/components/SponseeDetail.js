import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import api from "../axios"
import "../css/SponseeDetail.css"
import {Link} from "react-router-dom";
const SponseeDetail = (props) => {
    let res
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [reason, setReason] = useState(""); 
    const [schoolName, setSchoolName] = useState(""); 
    const [schoolAddress, setSchoolAddress] = useState(""); 
    const [birthcertiUrl, setBirthcertiUrl] = useState(""); 
    const [nationalIdUrl, setNationalIdUrl] = useState("");
    let history = useHistory();
    useEffect(() => {
        let token = localStorage.getItem("access")
        async function fetchdata() {
            try {
                res = await api.get(
                    "sponsee-detail/", 
                    { headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res.data)
                setName(`${res.data.user.first_name} ${res.data.user.last_name}`)
                setEmail(res.data.user.email)
                if(res.data.phone !== null)setPhone(res.data.phone)
                if(res.data.reason !== null) setReason(res.data.reason.reason)
                if(res.data.school !== null)setSchoolName(res.data.school.name)
                if(res.data.school !== null)setSchoolAddress(res.data.school.address)
                if(res.data.birth_certificate !== null)setBirthcertiUrl(res.data.birth_certificate)
                if(res.data.national_id !== null)setNationalIdUrl(res.data.national_id)
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
        <div className="DetailBox">            
            <div className="Unit">
                <div className="DetailLabel">Name:</div>
                <div className="Value">{name}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">Email:</div>
                <div className="Value">{email}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">Phone no:</div>
                <div className="Value">{phone}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">Reason:</div>
                <div className="Value">{reason}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">School Name:</div>
                <div className="Value">{schoolName}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">School Address:</div>
                <div className="Value">{schoolAddress}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">Birth certificate:</div>
                <div className="Value"><a href={birthcertiUrl} target="_blank" >Birth certificate</a></div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">National ID:</div>
                <div className="Value"><a href={nationalIdUrl} target="_blank" >National ID</a></div>
            </div>
       
        </div>
    )
}

export default SponseeDetail