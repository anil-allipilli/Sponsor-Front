import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import api from "../axios"
import refreshToken from "../refreshToken"
import "../css/SponseeDetail.css"
import {Link} from "react-router-dom";
import { Pencil } from 'react-bootstrap-icons';

const SponseeDetail = (props) => {
    let res
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [reason, setReason] = useState(""); 
    const [schoolName, setSchoolName] = useState(""); 
    const [schoolAddress, setSchoolAddress] = useState("");
    const [academicLevel, setAcademicLevel] = useState("");
    const [expectedYearOfCompletion, setExpectedYearOfCompletion] = useState("");
    const [birthcertiUrl, setBirthcertiUrl] = useState(""); 
    const [nationalIdUrl, setNationalIdUrl] = useState("");
    let history = useHistory();
    let user_type = localStorage.getItem("user")
    if(user_type === null) history.push("/login")
    if(user_type === "sponser") history.push("/sponsees-list")

    let edit = null
    if(user_type === "sponsee") {
        edit = <Pencil/>
    }
    const goToUserProfileEditHandler = () => {
        history.push("/sponsee-edit")
    }



    useEffect(() => {        
        async function fetchdata() {
            try {
                let token = localStorage.getItem("access")
                // eslint-disable-next-line
                res = await api.get(
                    "mysponseeprofile/", 
                    { headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res.data)
                setName(`${res.data.user.first_name} ${res.data.user.last_name}`)
                setEmail(res.data.user.email)
                if(res.data.phone !== null) setPhone(res.data.phone)
                if(res.data.reason !== null) setReason(res.data.reason.reason)
                if(res.data.school !== null){
                    setSchoolName(res.data.school.name)
                    setSchoolAddress(res.data.school.address)
                    setAcademicLevel(res.data.school.academic_level)
                    setExpectedYearOfCompletion(res.data.school.expected_year_of_completion)
                }
                if(res.data.birth_certificate !== null)setBirthcertiUrl(res.data.birth_certificate)
                if(res.data.national_id !== null)setNationalIdUrl(res.data.national_id)
            } catch(err) {
                console.log(err)
                if(err.response.status === 401) {
                    let refresh = await refreshToken()
                    if(!refresh) {
                        history.push("/login")
                    } else {
                        fetchdata()
                    }
                }
            }
        }
        if(user_type === "sponsee") {
            fetchdata()
        }
        
    }, [])
    return (
        <div className="DetailBox">            
            <div className="Unit">
                <div className="DetailLabel">Name:</div>
                <div className="Value">{name}</div>
                <div className="EditProfile" onClick={goToUserProfileEditHandler} >{edit}</div>
                
            </div>
            <div className="Unit">
                <div className="DetailLabel">Email:</div>
                <div className="Value">{email}</div>
                {/* <div className="EditProfile" >{edit}</div> */}
            </div>
            <div className="Unit">
                <div className="DetailLabel">Phone no:</div>
                <div className="Value">{phone}</div>
                <div className="EditProfile" onClick={() => history.push("/phone-edit")}>{edit}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">Reason:</div>
                <div className="Value">{reason}</div>
                <div className="EditProfile" onClick={() => history.push("/reason")}>{edit}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">School Name:</div>
                <div className="Value">{schoolName}</div>
                <div className="EditProfile" onClick={() => history.push("/school-edit") }>{edit}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">School Address:</div>
                <div className="Value">{schoolAddress}</div>

            </div>
            <div className="Unit">
                <div className="DetailLabel">Academic level:</div>
                <div className="Value">{academicLevel}</div>

            </div>
            <div className="Unit">
                <div className="DetailLabel">Year of Completion:</div>
                <div className="Value">{expectedYearOfCompletion}</div>

            </div>
            <div className="Unit">
                <div className="DetailLabel">Birth certificate:</div>
                <div className="Value"><a href={birthcertiUrl} target="_blank" rel="noreferrer" >Birth certificate</a></div>
                <div className="EditProfile" onClick={() => history.push("/bc-edit")} >{edit}</div>
            </div>
            <div className="Unit">
                <div className="DetailLabel">National ID:</div>
                <div className="Value"><a href={nationalIdUrl} target="_blank" rel="noreferrer" >National ID</a></div>
                <div className="EditProfile" onClick={() => history.push("/nid-edit")} >{edit}</div>
            </div>
       
        </div>
    )
}

export default SponseeDetail