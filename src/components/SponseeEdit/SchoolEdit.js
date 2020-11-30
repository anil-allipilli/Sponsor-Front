import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import refreshToken from "../../refreshToken"


import api from "../../axios"
import "../../css/SchoolEdit.css"
const SchoolEdit = (props) => {
    const [requestMethod, setRequestMethod] = useState("put");
    const [schoolName, setSchoolName] = useState(""); 
    const [schoolAddress, setSchoolAddress] = useState("");
    const [academicLevel, setAcademicLevel] = useState("");
    const [expectedYearOfCompletion, setExpectedYearOfCompletion] = useState("");
    let res
    let token = localStorage.getItem("access")
    let history = useHistory()
    useEffect(() => {
        async function fetchData() {  
            try {
                // eslint-disable-next-line
                res = await api.get(
                    "myschool/", 
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res)
                if(res.status === 200 ) {
                    setRequestMethod("put")
                    setSchoolName(res.data.name)
                    setSchoolAddress(res.data.address)
                    setAcademicLevel(res.data.academic_level)
                    setExpectedYearOfCompletion(res.data.expected_year_of_completion)

                }
            } catch(err) {
                console.log(err.response.status)
                if(err.response.status === 404) {
                    setRequestMethod("post")
                }
                if(err.response.status === 401) {
                    let refresh = await refreshToken()
                    if(!refresh) {
                        history.push("/login")
                    } else {
                        fetchData()
                    }
                }
            }
        }
        fetchData()
    }, [requestMethod])
    const formhandler = async (e) => {
        e.preventDefault()
        const schoolForm = new FormData()
        schoolForm.append("name", schoolName)
        schoolForm.append("address", schoolAddress)
        schoolForm.append("academic_level", academicLevel)
        schoolForm.append("expected_year_of_completion", expectedYearOfCompletion)

        let res;
        try {
            // let token = localStorage.getItem("access")
            res = await api({
                method: requestMethod,
                url: "myschool/",
                data: schoolForm,
                headers: {'Authorization': `Bearer ${token}`  }
            })
            console.log(res)

            history.push("/sponsee-detail")
        } catch (err) {
            console.log(err)
            if(err.response.status === 401) {
                let refresh = await refreshToken()
                if(!refresh) {
                    history.push("/login")
                } else {
                    formhandler(e)
                }
            }
        }
        console.log(res)
    }
    return (
        <form onSubmit={formhandler} className="SchoolEditBox" >
            <div className="SchoolEditUnit">
                <div className="SchoolDetailLabel">School Name:</div>
                <input className="SchooValue" onChange={(e) => setSchoolName(e.target.value)}  value={schoolName}></input>                
            </div>        
            <div className="SchoolEditUnit">
                <div className="SchoolDetailLabel">School Address:</div>
                <input className="SchooValue" onChange={(e) => setSchoolAddress(e.target.value)}  value={schoolAddress}></input>                
            </div>        
            <div className="SchoolEditUnit">
                <div className="SchoolDetailLabel">Academic level:</div>
                <input className="SchooValue" onChange={(e) => setAcademicLevel(e.target.value)}  value={academicLevel}></input>                
            </div>        
            <div className="SchoolEditUnit">
                <div className="SchoolDetailLabel">Year of Completion:</div>
                <input className="SchooValue" onChange={(e) => setExpectedYearOfCompletion(e.target.value)}  value={expectedYearOfCompletion}></input>                
            </div>  
            <div className="SchoolEditUnit">
            <button className="ReasonButton" type="submit">Submit</button> </div>      
                       
        </form>

    )
}

export default SchoolEdit