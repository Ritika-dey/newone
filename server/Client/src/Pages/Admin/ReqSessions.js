import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
function ReqSessions() {
    const [Data, setData] = useState(null);
    // costructor
    const [price, setprice] = useState("");
    const [tutor, settutor] = useState("");
    const [meetinglink, setmeetinglink] = useState("")
    const [currentItemId, setcurrentItemId] = useState(null);
    const [curency , setcurency]=useState("")
    const addsession = (currentItemId) => {

        const articles = {
            price, tutor, meetinglink , curency
        }
        setprice("");
        setmeetinglink("");
        settutor("");
        setcurency("");

        axios.put(`/updatesessions/${currentItemId}`, articles).then
            (
                res =>
                    window.alert(`session details updated`, res.data),

            )
            .catch(err => {
                console.log(err)
            })

    }
    const ChangeStatus = (_id) => {
        if (window.confirm("Do you want to change status ?")) {
            axios.put(`/ups/${_id}`).then((res) =>
                window.alert(res.data),
            )
        } else {
            window.alert("Status Pending")
        }
    }
    const ChangeStatusPending = (_id) => {
        if (window.confirm("Do you want to change status ?")) {
            axios.put(`/upsp/${_id}`).then((res) =>
                window.alert(res.data),
            )
        } else {
            window.alert("Status Pending")
        }
    }
    // + adding the use
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getsessions");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <>
            <div className="req__session ">
                <h2>Requested Live Sessions</h2>
                <div className="req__session__table ">
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>

                                <th>Email</th>
                                <th>Title</th>
                                <th>Desc</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>File</th>

                                <th>Status</th>
                                
                                <th>Payment</th>
                            </tr>
                        </thead>

                        {/* loop over this tr tage for data values insertion */}
                        <tbody>
                            {Data && (
                                <>
                                    {Data.map((i, index) => (
                                        <><tr>


                                            {/* loop over the Data */}


                                            <td>{i.email}</td>
                                            <td>{i.title}</td>
                                            <td>{i.desc}</td>
                                            <td>{i.duration}</td>
                                            <td>{i.date}</td>
                                            <td><a href={`Session/${i.image}`}>{i.image}</a></td>

                                            
                                            <td>{i.payment==="Pending"?<><button className='btn btn-primary' data-toggle="modal" data-target="#Statusmodal" onClick={() => setcurrentItemId(`${i._id}`)}>{i.status} <i className="fa fa-edit"></i></button></>:<><button className='btn btn-primary' data-toggle="modal" data-target="#Statusmodal" disabled onClick={() => setcurrentItemId(`${i._id}`)}>{i.status} <i className="fa fa-edit"></i></button></>}</td>

                                            <td>{i.payment}</td>
                                            <td><button className='btn btn-primary' data-toggle="modal" data-target="#solutionModal" onClick={() => setcurrentItemId(`${i._id}`)}>Add Session Details</button></td>
                                        </tr>
                                            {/* // modal form Adding Solution */}
                                            <div id="solutionModal" className="modal fade" role="dialog">
                                                <div className="modal-dialog">
                                                    {/* <!-- Modal content--> */}
                                                    <div className="modal-content">

                                                        <div className="modal-header">
                                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                            <h4 className="modal-title">Add solution for this assignment {currentItemId}</h4>
                                                        </div>

                                                        {/* dont change the parameter of addsession as it is the state of current item id already updated when add solution button is clicked */}
                                                        <form onSubmit={() => addsession(currentItemId)} >
                                                            <div className="modal-body">
                                                                <div className="form-group">
                                                                    <label htmlFor="name">Price:</label>
                                                                    <input
                                                                        value={price}
                                                                        className="form-control"
                                                                        onChange={(e) => setprice(e.target.value)}
                                                                        type="number"
                                                                        required />
                                                                </div>
                                                                <div className="form-group">
                                        <label htmlFor="remarks">Add Currency</label>
                                        <select className="form-control" id="sel1"  value={curency}
                                            onChange={(e) => setcurency(e.target.value)}>
 
    <option>Select</option>
    <option>$</option>
    <option>₹</option>
  </select>

                                    </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="name">Tutor Name:</label>
                                                                    <input
                                                                        value={tutor}
                                                                        className="form-control"
                                                                        onChange={(e) => settutor(e.target.value)}
                                                                        type="text"
                                                                        required />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="name">Meeting Link:</label>
                                                                    <input
                                                                        value={meetinglink}
                                                                        className="form-control"
                                                                        onChange={(e) => setmeetinglink(e.target.value)}
                                                                        type="text"
                                                                        required />
                                                                </div>



                                                                <button type="submit" className="btn btn-primary">Submit Solution</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* modal for changing status */}
                                            <div id="Statusmodal" className="modal fade" role="dialog">
                                                <div className="modal-dialog">
                                                    {/* <!-- Modal content--> */}
                                                    <div className="modal-content">

                                                        <div className="modal-header">
                                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                            <h4 className="modal-title">Change Status For This Assignment </h4>
                                                        </div>

                                                        {/* dont change the parameter of addsession as it is the state of current item id already updated when add solution button is clicked */}

                                                        <div className="modal-body">
                                                            <p>Change Status To Pending Or To Completed Here </p>

                                                            <div className='row md'>
                                                                <button className='btn btn-primary md-btn' onClick={() => ChangeStatus(currentItemId)}>Change To Completed</button>
                                                                <button className='btn btn-danger md-btn' onClick={() => ChangeStatusPending(currentItemId)}>Change To Pending</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </>
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

export default ReqSessions
