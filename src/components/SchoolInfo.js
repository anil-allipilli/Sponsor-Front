import React , {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

import api from "../axios"
import "../css/SchoolInfo.css"

const SchoolInfo = (props) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [academicLevel, setAcademicLevel] = useState("");
    const [expectedYearOfCompletion, setExpectedYearOfCompletion] = useState("");
    const [requestMethod, setRequestMethod] = useState("patch");
    let history = useHistory();

    let res
    let token = localStorage.getItem("access")

    useEffect(() => {
        async function fetchData() {  
            try {
                console.log(token)
                res = await api.get(
                    "school/", 
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res)
                if(res.status === 200 ) {
                    setRequestMethod("patch")
                    setName(res.data.name)
                    setAddress(res.data.address)
                    setAcademicLevel(res.data.academic_level)
                    setExpectedYearOfCompletion(res.data.expected_year_of_completion)
                }
            } catch(err) {
                console.log(err.response.status)
                if(err.response.status === 404) {
                    setRequestMethod("post")
                }
            }
        }
        fetchData()
    }, [requestMethod])

    const schoolHandler = async (e) => {
        e.preventDefault()
        const schoolForm = new FormData()
        schoolForm.append("name", name)
        schoolForm.append("address", address)
        schoolForm.append("academic_level", academicLevel)
        schoolForm.append("expected_year_of_completion", expectedYearOfCompletion)
        let res;
        try {
            let token = localStorage.getItem("access")
            res = await api({
                method: requestMethod,
                url: "school/",
                data: schoolForm,
                headers: {'Authorization': `Bearer ${token}`  }
            })
            console.log(res)

            history.push("/sponsee-detail")
        } catch (err) {
            console.log(err)
        }
        console.log(res)
    }
    return (
        <form className="SchoolBox" onSubmit={schoolHandler}>
            <label className="SchoolUnit">
                <b className="SchoolLabel">Name of the School</b>
                <input
                className="SchoolInput" 
                type="text" 
                placeholder="Enter school name" 
                required
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                ></input>
            </label>

            <label className="SchoolUnit">
                <b className="SchoolLabel">Address</b>
                <input
                className="SchoolInput" 
                type="text" 
                placeholder="Enter Address" 
                required
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                ></input>
            </label>

            <label className="SchoolUnit">
                <b className="SchoolLabel">Grade</b>
                <input
                className="SchoolInput" 
                type="number" 
                placeholder="Enter Grade"  
                required
                value={academicLevel} 
                onChange={(e) => setAcademicLevel(e.target.value)} 
                ></input>
            </label>

            <label className="SchoolUnit">
                <b className="SchoolLabel">Year of completion</b>
                <input
                className="SchoolInput" 
                type="year" 
                placeholder="Enter year of completion" 
                required
                value={expectedYearOfCompletion} 
                onChange={(e) => setExpectedYearOfCompletion(e.target.value)} 
                ></input>

            </label>

            <button className="SchoolButton"  type="submit">Add SchoolInfo</button>            
        </form>
    )
}

export default SchoolInfo