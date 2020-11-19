import React, {useEffect, useState} from 'react'

import api from "../axios"
import "../css/SponseeDetail.css"

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
                setPhone(res.data.phone)
                setReason(res.data.reason.reason)
                setSchoolName(res.data.school.name)
                setSchoolAddress(res.data.school.address)
                setBirthcertiUrl(res.data.birth_certificate)
                setNationalIdUrl(res.data.national_id)
            } catch(err) {
                console.log(err)
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
                <div className="Value">{birthcertiUrl}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">National ID:</div>
                <div className="Value">{nationalIdUrl}</div>
            </div>
       
        </div>
    )
}

export default SponseeDetail