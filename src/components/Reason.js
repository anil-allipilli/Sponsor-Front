import React from 'react'

const Reason = (props) => {
    return (
        <div>
            <label for="reason"><b>Reason</b></label>
            <textarea type="text" placeholder="Enter Reason" name="reason" required></textarea>


            <button type="submit">Register</button>            
        </div>
    )
}

export default Reason