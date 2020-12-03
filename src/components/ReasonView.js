import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from "react-router-dom";
import refreshToken from "../refreshToken"

import api from "../axios"
import "../css/Reason.css"
const Reason = (props) => {
    let {username} = useParams()
    const [reason, setReason] = useState("")    
    let history = useHistory()
    let res
    useEffect(() => {
        async function fetchData() {  
            try {
                let token = localStorage.getItem("access")
                // eslint-disable-next-line
                res = await api.get(
                    `reasons/${username}`, 
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res)
                if(res.status === 200 ) {
                    setReason(res.data.reason)
                }
            } catch(err) {
                console.log(err.response.status)
                if(err.response.status === 404) {
                    history.push("/sponsees-list")
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
    }, [])
    const addSponsorShipHandler = async () => {
        let res;
        try {
             let token = localStorage.getItem("access")
            res = await api({
                method: "post",
                url: `addsponsorship/${username}`,
                headers: {'Authorization': `Bearer ${token}`  }
            })
            console.log(res)

            history.push("/sponsee-detail")           
        } catch(err) {
            console.log(err)
            if(err.response.status === 401) {
                let refresh = await refreshToken()
                if(!refresh) {
                    history.push("/login")
                } else {
                    addSponsorShipHandler()
                }
            }
        }
    }

    return (
        <div className="ReasonBox" >
            <p className="ReasonText">
                {reason} 
            </p>           
            <button onClick={() => addSponsorShipHandler()} className="ReasonButton" >Sponsor</button>            
        </div>
    )
}

export default Reason