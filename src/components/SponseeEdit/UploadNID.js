import React, {useState} from 'react'
import refreshToken from "../../refreshToken"

import api from "../../axios"
import { useHistory } from "react-router-dom";
import "../../css/SponseeRegister.css"

const UploadNID = (props) => {

    const [nationalId, setNationalId] = useState("");


    let history = useHistory();
    const nationalIDHandler = async (e) => {
        e.preventDefault()
        const NationalIdFormData = new FormData()
        NationalIdFormData.append("national_id", nationalId)
        let res;
        try {
            let token = localStorage.getItem("access")
            res = await api({
                method: "patch",
                url: "mysponseeprofile/",
                data: NationalIdFormData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                     'Content-type': 'multipart/form-data'
                      }
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
                    nationalIDHandler(e)
                }
            }
        }
        console.log(res)
    }

    return (
        <form className="RegisterSponseeBox" onSubmit={nationalIDHandler}>

            <label className="RegisterUnit">
                <b className="RegisterLabel">National ID:</b>
                <input 
                className="RegisterInput"
                type="file" 
                onChange={(e) => setNationalId(e.target.files[0])}  
                required
            ></input>
            </label>
            <button className="RegisterButton"  type="submit">Submit</button>            
        </form>
    )
}

export default UploadNID