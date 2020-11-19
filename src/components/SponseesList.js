import React, {useEffect, useState} from 'react'
import api from "../axios"

const SponseeList = (props) => {
    let token = localStorage.getItem("access")
    let res
    const [sponsees, setSponsees] = useState([]); 

    useEffect(() => {        
        async function fetchdata() {
            try {
                res = await api.get(
                    "sponsees/", 
                    {headers: {'Authorization': `Bearer ${token}` }}
                )
                console.log(res.data)
                setSponsees(res.data)

            } catch(err) {
                console.log(err)
            }
        }
        fetchdata()
    }, [])
    let sponeesList = sponsees.map((sponsee) => {
        if(sponsee.reason !== null) {
            return (
                <li>
                    <h2>{`${sponsee.user.first_name} ${sponsee.user.last_name}`}</h2>
                    <h3>{sponsee.phone}</h3>
                    <h3>{sponsee.email}</h3>
                    <h3>{sponsee.reason.reason}</h3>
                </li>
            )
        }
    })
    return (
        <div>
        {sponeesList}
        </div>
    )
}

export default SponseeList