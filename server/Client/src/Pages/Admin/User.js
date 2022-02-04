import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from 'axios'

export default function User() {
    const [Data, setData] = useState(null);
   

   
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getusers");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <>
            <div className="user ">
                <h2>Customer Details</h2>
                <div className="user__table table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Profession</th>
                                
                                <th>DOB</th> 
                                <th>University</th>
                                
                            </tr>
                        </thead>

                        {/* loop over this tr tag for data values insertion */}
                        <tbody>
                        {Data && (
                                <>
                                    {Data.map((i, index) => (
                                        <tr key={index}>
                                <td>{i._id}</td>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.phone}</td>
                                <td>{i.profession}</td>
                                <td>{i.dob}</td>
                                <td>{i.university}</td>
                                
                            </tr> 

                         

))}

</>
)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
