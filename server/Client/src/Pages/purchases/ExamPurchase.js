import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
function ExamPurchase() {
    // temp count for showing the design
    const [currentItemId, setcurrentItemId] = useState(null);

    const [Data, setData] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/myexam");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);

        };
    }, []);
    const searchRecords = () => {
        axios.get(`/searche/${search}`)
            .then(response => {
                setData(response.data);
            });

    }
    return (
        <div className="assignment__purchases">
        <h3 className='assignment__purchases__title'>Exam Purchases</h3>
        <div className='purchases__search'>
                        <div className="input-group">
                            <input type="search" className="form-control" placeholder="Search Your Purchase By Title Here" onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)}/>
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
        <><div className=' purchases' key={index}>
                {/* repeat this card */}
                {i.payment === "Completed" ? <>
                    <div className='purchase row'>
                        <div className='col-sm-3 p_item'><p className='dt'>Order Placed :<br/>{i.date}</p></div>
                        <div className='col-sm-3 p_item'><p className='dt'>Amount:{i.price}  {i.curency}</p></div>
                        <div className='col-sm-3 p_item'><p className='dt'>Shipped To:{i.email}</p></div>
                        <div className='col-sm-3 p_item'><p className='dt'>Order Id:<br />#{i._id}</p></div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 data_cont'><h2 className='dt'>Question File: </h2>
                            <h2 className='dt'>

                                {i.payment == "Completed" ? <a target="_blank" href={`/Exam/${i.question}`} className="btn btn-primary sol">View Question</a> : <p className='text-danger'>Purchase the item first</p>}
                            </h2>

                        </div>
                        <div className='col-sm-3 data_cont'><h2 className='dt'>Subject: {i.topic}</h2>
                            <h2 className='dt'>

                                {i.payment == "Completed" ? <a target="_blank" href={`/Exam/${i.solution}`} className="btn btn-primary sol">View Solution</a> : <p className='text-danger'>Purchase the item first</p>}
                            </h2>

                        </div>
                        <div className='col-sm-3 data_cont'>
                            <h2 className='dt'>Payment:{i.payment}</h2>
                            <h2 className='dt'>

                                {i.payment == "Completed" ? <a href="/reviews" className="btn btn-primary sol">Rate Us</a> : <p className='text-danger'>Purchase the item first</p>}
                            </h2>

                        </div>
                        <div className='col-sm-3 data_cont1'>
                        
                        <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle invoice" type="button" data-toggle="dropdown">Invoice
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="#">Amount:{i.price}<i className=''>{i.curency}</i> </a></li>
      <li><a href="#">Subject:{i.topic}</a></li>
      <li><a href="#">Question:{i.question}</a></li>
      <li><a href="#">Soution:{i.solution}</a></li>
      <li class="divider"></li>
      <li><a href="#">Date:{i.date}</a></li>
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

export default ExamPurchase
