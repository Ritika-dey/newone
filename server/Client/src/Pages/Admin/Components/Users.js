import React, { useState, useEffect } from 'react'

import axios from 'axios'
export default function Users() {
    const [Data, setData] = useState(null);
   

   
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getuser");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <div>
            <div className="new__customer__list">
            <h4>Total Users{Data ?<>{Data && Data.length}</>:<>0</>}</h4>
            {Data && (
                                <>
                                    {Data.map((i, index) => (
                                <div className="customer" key={index}>
                                   
                                    <div className="customer__details col-sm-10">
                                        <h4>{i.name}</h4>
                                    </div>
                                     <div className="customer__details col-sm-10">
                                        <h6>{i.email}</h6>
                                    </div>
                                </div>
  ))}

  </>
)}
                               

                             
                               

                                
                            </div>
        </div>
    )
}
