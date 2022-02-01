
import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from 'axios'
function ReqAssignment() {
    const [currentItemId, setcurrentItemId] = useState(null);
    const [solution, SetSolution] = useState("")
    const [Data, setData] = useState(null)
    const [remarks , setremarks]=useState("")
    const [curency , setcurency]=useState("")
    const onChangeFile = (e) => {
        SetSolution(e.target.files[0]);
    }
    const addsol = (currentItemId) => {
        const formData = new FormData();
        formData.append("remarks", remarks)
        formData.append("solution", solution);
        formData.append('curency',curency)
        SetSolution("");
        setremarks("");
        setcurency("")

        axios.put(`/updateassignment/${currentItemId}`, formData).then((res) =>
            window.alert("Solution Added"),
            // history.push('/myque')
        )
            .catch((err) => {
                window.alert(err);
            });

    }

    // update this as we discussed in last call two buttons one red for pending and other one is green for done status
    const ChangeStatus = (currentItemId) => {
       
            // axios.put(`/up/${currentItemId}`).then((res) =>
            //     window.alert(res.json)
            // )
            if(window.confirm("Do you want to change status ?")){
                axios.put(`/up/${currentItemId}`).then((res) =>
                window.alert(res.data),
                )
            }else{
               window.alert("Status Pending")
            }
       
    }
    const ChangeStatusPending = (currentItemId) => {
       
        // axios.put(`/upending/${currentItemId}`).then((res) =>
        //     window.alert(res.json)
        // )
        if(window.confirm("Do you want to change status ?")){
            axios.put(`/upending/${currentItemId}`).then((res) =>
            window.alert(res.data),
            )
        }else{
           window.alert("Status Pending")
        }
   
}

    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getassignment");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <>
            <div className="req__assignment ">
                <h2>Requested Assignment Helps</h2>
                <div className="req_assignment_table ">
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Desc</th>
                                <th>Type</th>
                                <th>Deadline</th>
                                <th>File</th>
                                
                                <th>Status</th>
                                <th>Payment Status</th>
                                <th>Solution file</th>
                            </tr>
                        </thead>

                        {/* loop over this tr tage for data values insertion */}
                        <tbody>
                        {Data && (
        <>
        {Data.map((i, index) => (
                            <><tr key={index}>
                <td>{i.email}</td>
                <td>{i.title}</td>
                <td>{i.desc}</td>
                <td>{i.type}</td>
                <td>{i.deadline}</td>
               
                <td><a href={`Assignment/${i.image}`}>{i.image}</a></td>
                {/* changestate(i._id) */}
                <td>{i.payment==="Pending"?<><button className='btn btn-primary' data-toggle="modal" data-target="#Statusmodal" onClick={() => setcurrentItemId(`${i._id}`)}>{i.status} <i className="fa fa-edit"></i></button></>:<><button className='btn btn-primary' data-toggle="modal" data-target="#Statusmodal" disabled onClick={() => setcurrentItemId(`${i._id}`)}>{i.status} <i className="fa fa-edit"></i></button></>}</td>
                <td>{i.payment}</td>
                {/* here onclick event is for setting the id for modal. use it like setcurrentItemId(i._id) */}
                <td><button className='btn btn-primary' data-toggle="modal" data-target="#solutionmodal" onClick={() => setcurrentItemId(`${i._id}`)}>{i.solution==="Pending"?<>Add Solution</>:<>{i.solution}</>}</button></td>
            </tr>
                {/* // modal form Adding Solution */}
                <div id="solutionmodal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        {/* <!-- Modal content--> */}
                        <div className="modal-content">

                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add solution for this assignment {currentItemId}</h4>
                            </div>

                            {/* dont change the parameter of addsol as it is the state of current item id already updated when add solution button is clicked */}
                            <form encType="multipart/form-data" onSubmit={() => addsol(currentItemId)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Price:</label>
                                        <input
                                            type="number"
                                            // use value from backend
                                            value="500"
                                            className="form-control"
                                            placeholder="Add total price for this assignment" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="remarks">Remarks</label>
                                        <input
                                            type="text"
                                            value={remarks}
                                            onChange={(e) => setremarks(e.target.value)}
                                            name="institution"
                                            className="form-control"
                                            placeholder="Add remarks if any, OPTIONAL" />
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

                                    <div className='form-group'>
                                        <label htmlFor='solutionfile'>Solution File(PDF):</label>
                                        <input
                                            onChange={onChangeFile}
                                            type="file"
                                            filename="solution"
                                            className='form-control' />
                                    </div>


                                    <button type='submit' className="btn btn-primary">Submit Solution</button>
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

                            {/* dont change the parameter of addsol as it is the state of current item id already updated when add solution button is clicked */}
                           
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

export default ReqAssignment