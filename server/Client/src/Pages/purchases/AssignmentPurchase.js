import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Purchases.css'
import axios from 'axios'

function AssignmentPurchase() {
    const [Data, setData] = useState([]);
    const [search, setSearch] = useState('');
    console.log(Data)
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/myassign");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);

        };
    }, []);
    const searchRecords = () => {
        axios.get(`/searcha/${search}`)
            .then(response => {
                setData(response.data);
            });

    }
    return (
        <div className="assignment__purchases">
            <h3 className='assignment__purchases__title'>Assignment Help Purchases</h3>
            <div className='purchases__search'>
                <div className="input-group">
                    <input type="search" className="form-control" placeholder="Search Your Purchase By Title Here" onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)} />
                    <div className="input-group-btn">
                        <button className="btn btn-primary" type="submit">
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* data containers */}
            {Data && (<>

                {
                    Data.length === 0 ?
                        <div className='empty__purchase' align="center">
                            <h3><b>You haven't purchased anything yet..!!</b></h3>
                            <img className='img-responsive' src='https://image.freepik.com/free-vector/search-concept-yellow-folder-magnifier-icons-hand-drawn-cartoon-art-illustration_56104-891.jpg' alt="empty order image" />
                        </div>
                        :
                        Data.map((i, index) =>
                            <><div className='purchases' key={index}>
                                {/* repeat this card */}
                                {i.payment === "Completed" ? <>
                                    <div className='purchase row'>
                                        <div className='col-sm-3 p_item'><p className='dt'>Order Placed :<br />{i.date}</p></div>
                                        <div className='col-sm-3 p_item'><p className='dt'>Amount:{i.price}  {i.curency}</p></div>
                                        <div className='col-sm-3 p_item'><p className='dt'>Shipped To:{i.email}</p></div>
                                        <div className='col-sm-3 p_item'><p className='dt'>Order Id:<br />#{i._id}</p></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-3 data_cont'><h2 className='dt'>Deadline: {i.deadline}</h2>
                                            <h2 className='dt'> 
                                                {i.payment == "Completed" ? <a target="_blank" href={`/Assignments/${i.image}`} className="btn btn-primary sol">View Question</a> : <p className='text-danger'>Purchase the item first</p>}
                                            </h2> 
                                        </div>

                                        <div className='col-sm-3 data_cont'><h2 className='dt'>Subject: {i.title}</h2>
                                            <h2 className='dt'> 
                                                {i.payment == "Completed" ? <a target="_blank" href={`/Assignments/${i.solution}`} className="btn btn-primary sol">View Solution</a> : <p className='text-danger'>Purchase the item first</p>}
                                            </h2> 
                                        </div>

                                        <div className='col-sm-3 data_cont'>
                                            <h2 className='dt'>Payment:{i.payment}</h2>
                                            <h2 className='dt'> 
                                                {i.payment == "Completed" ? <a href="/reviews" className="btn btn-primary sol">Rate Us</a> : <p className='text-danger'>Purchase the item first</p>}
                                            </h2> 
                                        </div>

                                        <div className='col-sm-3 data_cont1'> 
                                            <div className="dropdown">
                                                <button className="btn btn-primary dropdown-toggle invoice" type="button" data-toggle="dropdown">Invoice
                                                    <span className="caret"></span></button>
                                                <ul className="dropdown-menu">
                                                    <li><Link to="#">Amount:{i.price}<i className=''>{i.curency}</i> </Link></li>
                                                    <li><Link to="#">Subject:{i.title}</Link></li>
                                                    <li><Link to="#">Type:{i.type}</Link></li>
                                                    <li className="divider"></li>
                                                    <li><Link to="#">Time:{i.deadline}</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div><hr className='line' />

                                </> : <></>}
                            </div></>
                        )}

            </>)}

            {/* data container end up */}
        </div>
    )
}

export default AssignmentPurchase
