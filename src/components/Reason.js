import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";

import api from "../axios"
import "../css/Reason.css"
const Reason = (props) => {
    const [requestMethod, setRequestMethod] = useState("put");
    const [reason, setReason] = useState("");
    let res
    let token = localStorage.getItem("access")
    let history = useHistory()
    useEffect(() => {
        async function fetchData() {  
            try {

                res = await api.get(
                    "reason/", 
                    {headers: {'Authorization': `Bearer ${token}`}}
                )
                console.log(res)
                if(res.status === 200 ) {
                    setRequestMethod("put")
                    setReason(res.data.reason)

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
    const reasonhandler = async (e) => {
        e.preventDefault()
        const reasonForm = new FormData()
        reasonForm.append("reason", reason)

        let res;
        try {
            // let token = localStorage.getItem("access")
            res = await api({
                method: requestMethod,
                url: "reason/",
                data: reasonForm,
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
        <form onSubmit={reasonhandler} className="ReasonBox" >
            <textarea 
            type="text" 
            placeholder="Enter Reason"
            required
            className="ReasonText"
            value={reason} 
            onChange={(e) => setReason(e.target.value)}                 
            ></textarea>           
            <button className="ReasonButton" type="submit">Register</button>            
        </form>
        // <form>
        //     <label>
        //         <b>Reason</b>
        //         <textarea 
        //         type="text" 
        //         placeholder="Enter Reason"
        //         required
        //         value={reason} 
        //         onChange={(e) => setReason(e.target.value)}                 
        //         ></textarea>                

        //     </label>
        //     <button onClick={reasonhandler} type="submit">Register</button>            
        // </form>
    )
}

export default Reason