import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Exam() {
    const [Data, setData] = useState(null);
   

   
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getexam");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <div>
            <div className="req__cards__content" align="center">
                                <h4>Requested Exams</h4>
                                {/* put value from backend here */}
                                <p>{Data ?<>{Data && Data.length}</>:<>0</>}</p>
                            </div>  
        </div>
    )
}
