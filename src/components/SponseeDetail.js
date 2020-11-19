import React, {useEffect, useState} from 'react'

import api from "../axios"

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
                    {
                        headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                    }
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
        <div>      
            
            <div>{name}</div>
            <div>{email}</div>            
            <div>{phone}</div>            
            <div> {reason}</div>
            <div>{schoolName}</div>
            <div>{schoolAddress}</div>
            <div>{birthcertiUrl}</div>
            <div>{nationalIdUrl}</div>          
        </div>
    )
}

export default SponseeDetail