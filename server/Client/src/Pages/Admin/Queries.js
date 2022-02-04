import React, { useState, useEffect } from 'react'
import './Admin.css'

function Queries() {
    const [Data, setData] = useState(null);
    // costructor

    // + adding the use
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getquery");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <>
            <div className="queries container-fluid">
                <h2>Recentle posted Queries</h2>
                <div className="queries__table table-responsive conainer">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Email</th>
                                <th>Queries</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Data && (
                                <>
                                    {Data.map((i, index) => (
                                        <tr>


                                            {/* loop over the Data */}

                                            <td>{i._id}</td>
                                            <td>{i.email}</td>
                                            <td>{i.query}</td>
                                            <td>{i.date}</td>


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

export default Queries
