import React, {useState , useEffect} from 'react'
import axios from 'axios'
function Notification() {
    const [user , setuser]=useState(null)
    const [postedto ,setpostedto]=useState("")
    const [title , settitle]=useState("")
    const [body , setbody]=useState("")
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getusers");
            const data = await res.json();

            // store the data into our Data variable
            setuser(data);
        }
    }, []);
    const submit=(e)=>{
        e.preventDefault()
     const notification={
         postedto,title,body
     } 
    setpostedto("");
     settitle("");
     setbody("");
     axios.post("/addnot", notification).then
      (
        res =>
          window.alert(res.data),

      )
      .catch(err => {
        console.log(err)
      })
    }
    return (
        <div className='add__notification '>
            <h2>Add Notification</h2>
            <div className='add__notification__form '>
                <form>
                  

                    <div className='form-group'>
                        {/* fetch data of all users and place in these select tag. value in the option tag should be the user id of that user */}
                        <label htmlFor='users'>Select user to be notified:</label>
                        
                            <select name="users" id="users" className='form-control' value={postedto} onChange={(e) =>setpostedto(e.target.value)}>
                            <option>Select User</option>
                            {user && (
                                <>
                                    {user.map((i, index) => (
                                <>
                                <option key={index} value={i._id}>{i.email}</option></>
                                ))}

</>
)}
                            </select>
                       
                    </div>

                    <div className='form-group'>
                        <label htmlFor='notification-title'>Notification Title</label>
                        <input name='notification-title' value={title} onChange={(e)=>settitle(e.target.value)} className='form-control' placeholder='Enter Notification Title Here'/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='notification'>Notification Body</label>
                        <textarea name='notification' value={body} onChange={(e)=>setbody(e.target.value)} className='form-control' rows={5} placeholder='Type Notification Here'></textarea>
                    </div>
                    
                    <button className='btn btn-primary' onClick={submit}>Notify</button>
                </form>
            </div> 
        </div>
    )
}

export default Notification
