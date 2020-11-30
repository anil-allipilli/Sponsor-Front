import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import api from "../../axios"
import "../../css/SponseeDetail.css"
import refreshToken from "../../refreshToken"

const PhoneEdit = (props) => {
    let res
    const [phone, setPhone] = useState(""); 

    let history = useHistory();
    let user_type = localStorage.getItem("user")
    if(user_type === "sponser") history.push("/sponsees-list")

    const submitHandler = async (e) => {
        e.preventDefault()
        const editPhoneForm = new FormData()
        editPhoneForm.append("phone", phone)
        let res;
        try {
            let token = localStorage.getItem("access")
            console.log(token)

            res = await api({
                method: "patch",
                url: "mysponseeprofile/",
                data: editPhoneForm,
                headers: {'Authorization': `Bearer ${token}`}
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
                    submitHandler(e)
                }
            }
        }
        console.log(res)
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

                if(res.data.phone !== null)setPhone(res.data.phone)

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
    return (
        <form className="DetailBox"  onSubmit={submitHandler}>            

            <div className="Unit">
                <div className="DetailLabel">Phone No.:</div>
                <input className="Value" onChange={(e) => setPhone(e.target.value)}  value={phone}></input>                
            </div>

   


            <button className="RegisterButton"  type="submit">Submit</button>
        </form>
    )
}

export default PhoneEdit