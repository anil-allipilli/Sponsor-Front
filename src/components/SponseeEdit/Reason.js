import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import refreshToken from "../../refreshToken"

import api from "../../axios"
import "../../css/Reason.css"
const Reason = (props) => {
    const [requestMethod, setRequestMethod] = useState("put");
    const [reason, setReason] = useState("");
    let res
    
    let history = useHistory()
    useEffect(() => {
        async function fetchData() {  
            try {
                let token = localStorage.getItem("access")
                // eslint-disable-next-line
                res = await api.get(
                    "myreason/", 
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
    const reasonhandler = async (e) => {
        e.preventDefault()
        const reasonForm = new FormData()
        reasonForm.append("reason", reason)

        let res;
        try {
            let token = localStorage.getItem("access")
            res = await api({
                method: requestMethod,
                url: "myreason/",
                data: reasonForm,
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
                    reasonhandler(e)
                }
            }
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
            <button className="ReasonButton" type="submit">Submit</button>            
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