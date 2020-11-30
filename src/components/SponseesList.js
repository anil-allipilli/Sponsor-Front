import React, {useEffect, useState} from 'react'
import api from "../axios"
import { useHistory } from "react-router-dom";
import refreshToken from "../refreshToken"
import "../css/SponseesList.css"
const SponseeList = (props) => {
    let token = localStorage.getItem("access")
    let res
    const [sponsees, setSponsees] = useState([]); 
    let history = useHistory();
    let user_type = localStorage.getItem("user")
    if(user_type === "sponsee") history.push("/sponsee-detail")

    useEffect(() => {     

        async function fetchdata() {
            try {
                // eslint-disable-next-line
                res = await api.get(
                    "sponsees/", 
                    {headers: {'Authorization': `Bearer ${token}` }}
                )
                console.log(res.data)
                setSponsees(res.data)

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
        fetchdata()
    }, [])
    let sponeesList = sponsees.map((sponsee, i) => {
        if(sponsee.reason !== null) {
            return (
                <div key={i} className="SponseeItem" >
                    <p className="SponseeName">{`${sponsee.user.first_name} ${sponsee.user.last_name}`}</p>
                    <p className="SponseePhone">{sponsee.phone}</p>
                    <p className="SponseeEmail">{sponsee.user.email}</p>
                    <p className="SponseeReason">{sponsee.reason.reason.substring(0,20)}</p>
                </div>
            )
        }
    })
    return (
        <div className="SponseesBox">
        <div  className="SponseeItem" >
            <p className="SponseeName">Name</p>
            <p className="SponseePhone">Phone</p>
            <p className="SponseeEmail">Email</p>
            <p className="SponseeReason">Reason</p>
        </div>
        {sponeesList}
        </div>
    )
}

export default SponseeList