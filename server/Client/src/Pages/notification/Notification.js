import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Notification.css'
import axios from 'axios';
function Notification() {
    const [Data, setData] = useState([]);
    console.log(Data)
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getnoti");
            const data = await res.json();
            // store the data into our Data variable
            setData(data);
        };
    }, []);

    const read=(_id)=>{
        axios.put(`/updatenot/${_id}`).then((res) =>
        console.log(res.data))
    }

    return (
        <>
            <div className='notification__container container'>
                <div className='notifcation__header'>
                    <h5><b>Notifications</b></h5> &nbsp;&nbsp;&nbsp;
                    <button title='Mark all as read' className="btn"><i className='fa fa-check'></i></button>
                </div>

                <hr style={{ borderTop: "2px solid black" }} />
                {Data && (
                    <>    {
                        Data.map((i, index) =>
                        // bg color for this div is blue only for unread buttons
                            <div key={index}>
                            { i.read=="Pending" ?
                            <>
                            <div className='notification col-sm-11'  style={{ backgroundColor: "rgb(202, 225, 233)" }} >
                                <div className='notification__body col-xs-11'>
                                    <p className='notification__time'>{i.date}</p>
                                    <h5 className='notification__title'>{i.title}</h5>
                                  <Link to={"/read/" + i._id} onClick={read(i._id)} className='text-right'>Read More</Link>
                                </div>
                            </div>
                            </>
                            :
                            <>
                            <div className='notification col-sm-11' >
                                <div className='notification__body col-xs-11'>
                                    <p className='notification__time'>{i.date}</p>
                                    <h5 className='notification__title'>{i.title}</h5>
                                  <Link to={"/read/" + i._id} onClick={read(i._id)} className='text-right'>Read More</Link>
                                </div>
                            </div>
                            </>
                            }
                            </div> 
                        )}

                    </>
                )}


            </div>
        </>
    )
}

export default Notification