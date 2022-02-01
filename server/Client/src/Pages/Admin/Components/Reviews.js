import React, { useState, useEffect } from 'react'

import axios from 'axios'
export default function Reviews() {
    const [Data, setData] = useState(null);
   

    const ChangeStatus = (_id) => {
      
        axios.put(`/updatereview/${_id}`).then((res) =>
        window.alert(res.data),
        
        )
    }

   
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getreview");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <div>
            <div className="new__customer__list">
            {Data?Data && (
                                <>
                                    {Data.map((i, index) => (
                                <div className="pending__review" key={index}>
                                <div className="review__details col-xs-9">
                                    <h4>{i.name}</h4>
                                    <p>{i.review}</p>
                                </div>
                                <div className="review__approve__btn col-xs-3">
                                    <button className="btn btn-primary" onClick={()=>ChangeStatus(i._id)}>Approve</button>
                                </div>
                            </div>
  ))}

  </>
):<p className='text-center'>No Pending Approvals</p>}
                               

                             
                               

                                
                            </div>
        </div>
    )
}
