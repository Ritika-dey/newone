import {React, useState, useEffect} from 'react'

import './Profile.css'
import {Link} from 'react-router-dom'
import axios from 'axios';

function UserAns() {
    
    const [Data, setData] = useState(null);




    // + adding the use
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/myans");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);

        }
    }, []);
    // logic end

    const deletenote=async(id)=>{
        await axios.delete(`/deleteans/${id}`).then(res=>window.alert(res.data))
        
     }
    return (
        <> 
           <div className="user__ans__Container container-fluid">
                <h2 className="user__ans__title">Answers by Me</h2>
                <hr style={{border:"1px solid #153280"}}/>

                <div className="user__ans__details">
                {Data ? Data && (
                                <>
                                {Data.map((i,index)=>(
                                    <div className="user__answer" key={index}>
                                    <h3 className="ques__desc"><strong>{i.question}</strong></h3>
                                    <p className="ans__desc">{i.answer.slice(0,130)}...</p>
                                    <div className="row">
                        <Link to={"/viewanswer/" + i._id} className="btn btn-default user__read__more__btn">View</Link>
                       
                        <Link to= {"/edit1/" +  i._id}><button type="button" class="btn btn-default user__read__more__btn">Edit Answer</button></Link>
                        <button onClick={()=>deletenote(i._id)} type="button" className="btn btn-default user__read__more__btn">Delete Answer</button>
                        </div>
                                </div>
                                ))}
               {/* Just keep one div and apply loop on it as we fetch data from backend */}
                   
                  
                    </>
                        ):<div className="col-sm">
                            <h2 className="text-center text-danger"> No Answers Yet</h2>
                            <Link to= "/discussion"><h4 className="text-center text-primary">Add Answer</h4></Link>
                            </div>
                            }
                  
                </div>
           </div>
        </>
    )
}

export default UserAns
