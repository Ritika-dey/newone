import React, { useState, useEffect } from 'react'
import './Profile.css'


function UserBasics() {
    const [userData, setUserData] = useState({});
    //  logic for fetching user from database
    const callProfilepage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();

            console.log(data);
            setUserData(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        callProfilepage()
    }, [])
    // ends here
    return (
        <>
            <div className="user__basics__container container-fluid">
                <h2 className="user__basics__title">Basic Information</h2>
                <hr style={{ border: "1px solid #153280" }} />

                <div className="user__email user__details col-sm-6">
                    <h3><i className="fa fa-envelope" aria-hidden="true"></i> Email </h3>
                    <h4>{userData.email}</h4>
                </div>
                <div className="user__mob user__details col-sm-6">
                    <h3><i className="fa fa-phone" aria-hidden="true"></i> Phone </h3>
                    <h4>{userData.phone}</h4>
                </div>
                <div className="user__dob user__details col-sm-6">
                    <h3><i className="fa fa-calendar" aria-hidden="true"></i> Date of Birth </h3>
                    <h4>{userData.dob}</h4>
                </div>
            </div>
        </>
    )
}

export default UserBasics
