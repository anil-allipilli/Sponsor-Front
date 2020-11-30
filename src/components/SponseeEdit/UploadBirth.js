import React, {useState} from 'react'
import refreshToken from "../../refreshToken"

import api from "../../axios"
import { useHistory } from "react-router-dom";
import "../../css/SponseeRegister.css"

const UploadBirth = (props) => {

    const [birthCertificate, setBirthCertificate] = useState("");
    

    let history = useHistory();
    const birthcertiHandler = async (e) => {
        e.preventDefault()
        const birthCertiFormData = new FormData()
        birthCertiFormData.append("birth_certificate", birthCertificate)
        let res;

        try {
            let token = localStorage.getItem("access")
            res = await api({
                method: "patch",
                url: "mysponseeprofile/",
                data: birthCertiFormData,
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
                    birthcertiHandler(e)
                }
            }
        }
        console.log(res)
    }

    return (
        <form className="RegisterSponseeBox" onSubmit={birthcertiHandler}>

            <label className="RegisterUnit">
                <b className="RegisterLabel">Birth Certificate</b>
                <input 
                className="RegisterInput"
                type="file" 
                onChange={(e) => setBirthCertificate(e.target.files[0])}  
                required
            ></input>
            </label>
            <button className="RegisterButton"  type="submit">Submit</button>            
        </form>
    )
}

export default UploadBirth