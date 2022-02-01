import React,{useState , useEffect} from 'react'
import './Service.css'
import live_session_img from './Live_session.png'
import axios from 'axios'
import { useHistory} from 'react-router-dom'
function One_on_one() {
    const history = useHistory()
    const [email, SetEmail] = useState("")
    const [title,SetTitle]=useState("")
    const[desc,SetDesc]=useState("")
    const[date,SetDate]=useState("")
    const [duration, SetDuration] = useState("")
    const [fileName, SetFileName] = useState("")
    const [price, setprice] = useState(0)
//   setprice
 
    // file
    const onChangeFile = (e) => {
        SetFileName(e.target.files[0]);
    }
     // adddata
     const changeClick = (e) => {
      if(!email || !desc || !date ||!duration ||!title ||!fileName){
       window.alert("Feilds Cannot Be Empty")
      }else{
           
        const formData = new FormData();
        formData.append("email", email);
        formData.append("desc", desc);
        formData.append("date", date);
        formData.append("duration", duration);
        formData.append("title", title);
        formData.append("price" , price);
        formData.append("image", fileName);
        SetEmail("");
        setprice("");
        SetTitle("");
        SetDesc("");
        SetDate("");
        SetDuration("");
        axios.post("/addsessions", formData).then((res) =>
            window.alert("Session request posted"),
            history.push('/profile')
        )


            .catch((err) => {
                console.log(err)
            });
      }

    };
    const callProfilepage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            


            const data=await  res.json();
    
            console.log(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err)

            window.alert("Please Login First")
            history.push('/login')
        }
    }

    useEffect(() => {
       
        callProfilepage()
    })
    return (
        <>
            <div className="live__session__help container">
            {/* Live session header */}
               <h3 className="text-primary live__session__title">Live session</h3>
               <hr style={{borderTop:"2px dotted #153280"}}/>
               <p className="live__session__desc text-justify">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
               </p>
            </div>
            {/* Live session header end */}

            {/* live session content */}
            <div className="live__sesssion__content container">
                <h3 className="text-primary live__session__title">How to book Live session</h3>
                <hr style={{borderTop:"2px dotted #153280"}}/>
                <div className="live__Session__img">
                    <img src={live_session_img} alt="how it works live session" className="img-thumbnail img-responsive" />
                </div>                
            </div>
            {/* live session content end */}    

            {/* live session form */}
             <div className="live__session__form container">
               <h3 className="live__session__title">Book your Live session</h3>
               <hr style={{borderTop:"2px dotted white"}}/>

               <form className="container form__container col-sm-8" onSubmit={changeClick} encType="multipart/form-data">
                    <div className="form-group">
                        <label for="email">Email: </label>
                        <input type="email"  name={email} onChange={(e) => SetEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label for="title">Subject Title: </label>
                        <input type="text"  name={title} onChange={(e) => SetTitle(e.target.value)} className="form-control" id="title" placeholder="Enter Subject title"/>
                    </div>  
                    <div className="form-group">
                        <label for="desc">Problem Description</label>
                        <textarea type="text"  name={desc} onChange={(e) => SetDesc(e.target.value)} rows="3" className="form-control" id="desc" placeholder="Enter Course description"/>
                    </div> 
                    <div className="form-group">
                        <label for="session_date">Session Date</label>
                        <input type="datetime-local"  name={date} onChange={(e) => SetDate(e.target.value)} className="form-control" id="session_date"/>
                    </div> 
                    <div className="form-group">
                        <label for="duration">Session Duration</label>
                        <input type="number"  name={duration} onChange={(e) => SetDuration(e.target.value)} className="form-control" id="duration" placeholder="Duration in Minutes"/>
                    </div> 
                   
                    <div className="form-group">
                        <input type="file" filename="image" onChange={onChangeFile} placeholder="image" required/>
                    </div>

                    <div className="form-group"> 
                        <button type="submit" className="btn btn-primary">Submit</button> 
                    </div>
                </form> 
                <div className='services__tips col-sm-2'>
                    <h3><strong>Tips <i className="fa fa-lightbulb-o" aria-hidden="true"></i></strong></h3>
                    <hr style={{borderColor:"white"}}/>
                    <div className="panel ">
                       <div className="panel-body" style={{color:"#4d67ad", fontWeight:"bold"}}>Make sure your questions are concise</div>
                       <div className="panel-body" style={{color:"#4d67ad", fontWeight:"bold"}}>For multiple pages upload in PDF format.</div>
                       <div className="panel-body" style={{color:"#4d67ad", fontWeight:"bold"}}>Use formal language and double check spellings</div>
                    </div>
                </div>
                {/* live session form end */}
            </div>
        </>
    )
}

export default One_on_one
