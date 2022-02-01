import {React, useState, useEffect} from 'react'

import './Profile.css'
import {Link} from 'react-router-dom'
import axios from 'axios';

function UserQues() {
    const [Data, setData] = useState(null);




    // + adding the use
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/myque");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    }, []);
    // logic end
// const delete =(id)=>{
//     axios.delete(`/${id}`).then(res=>window.alert(res.data))
//     setData(data.filter(elem=>elem._id !==id))
// }
const deletenote=async(_id)=>{
   await axios.delete(`/delete/${_id}`).then(res=>window.alert(res.data))
   
}
    return (
        <> 
           <div className="user__ques__Container container-fluid">
                <h2 className="user__ques__title">Questions by Me</h2>
                <hr style={{border:"1px solid #153280"}}/>

                <div className="user__ques__details">
               {/* Just keep one div and apply loop on it as we fetch data from backend */}
               {Data ? Data && (
                                <>
                                {Data.map((i,index)=>(
                    <div className="user__question">
                        <h3 className="ques__desc"><strong>{i.question.slice(0.110)}</strong></h3> 
                        <div className="row">
                        <Link to="/discussion" className="btn btn-default user__read__more__btn">View</Link>
                        <Link to= {"/edit/" +  i._id}><button type="button" className="btn btn-default user__read__more__btn">Edit Question</button></Link>
                        <button onClick={()=>deletenote(i._id)} type="button" className="btn btn-default user__read__more__btn">Delete Question</button>

                        </div>
                       
                    </div>
                     ))}
                     {/* Just keep one div and apply loop on it as we fetch data from backend */}
                         
                        
                          </>
                              ):<div className="col-sm">
                                  <h2 className="text-center text-danger"> No Questions Yet</h2>
                                  <Link to= "/discussion"><h4 className="text-center text-primary">Add Answer</h4></Link>
                                  </div>
                                  }
                  
                   
                    
                </div>
           </div>
        </>
    )
}

export default UserQues
