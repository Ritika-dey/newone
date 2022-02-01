import React,{useState , useEffect } from 'react'
import './Service.css'
import axios from 'axios'
import { useHistory} from 'react-router-dom'
function Course_help() {
    const history = useHistory()
    const [email, SetEmail] = useState("")
    const [title,SetTitle]=useState("")
    const[desc,SetDesc]=useState("")
    const[type,SetType]=useState("")
    const [deadline, SetDeadline] = useState("")
    const [fileName, SetFileName] = useState("")
    const [price, setprice] = useState(0)
//   setprice
 // select total question

    // file
    const onChangeFile = (e) => {
        SetFileName(e.target.files[0]);
    }
     // adddata
     const changeClick = (e) => {
        
        if(!email || !desc ||!type || !deadline ||!title ||!fileName){
         window.alert("Feilds Cannot Be Empty")
        }else{
            const formData = new FormData();
        formData.append("email", email);
        formData.append("desc", desc);
        formData.append("type", type);
        formData.append("deadline", deadline);
        formData.append("title", title);
        formData.append("image", fileName);
        formData.append("price",price);
        SetEmail("");
        setprice("");
        SetTitle("");
        SetDesc("");
        SetType("");
        SetDeadline("");
        axios.post("/course", formData).then((res) =>
            window.alert(res.data),
           
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
            
            <div className="Course__help container">
            {/* course help header */}
               <h3 className="text-primary Course__help__title">Course Help</h3>
               <hr style={{borderTop:"2px dotted #153280"}}/>
               <p className="Course__help__desc text-justify">
                   We you with a tutor expert in the subject you need help. This service is best for students who need help with a subject and conceptual 
                   issues, with a tutor to guide you through an entire course until you master the material.
               </p>
            </div>
            {/* course help header end */}

            {/* course help container */}
            <div className="course__help__container container">
                <h3 className="text-primary Course__help__title">Course Help Subjects</h3>
                <hr style={{borderTop:"2px dotted #153280"}}/> 
                <div className="row">
                    <div className="col-sm-4 list-group"><li className="list-group-item">DBMS</li></div>
                    <div className="col-sm-4 list-group"><li className="list-group-item">OS</li></div>
                    <div className="col-sm-4 list-group"><li className="list-group-item">Computer Network</li></div>
                </div>
                <div className="row">
                    <div className="col-sm-4 list-group"><li className="list-group-item">Discrete mathematics</li></div>
                    <div className="col-sm-4 list-group"><li className="list-group-item">Automata theory</li></div>
                    <div className="col-sm-4 list-group"><li className="list-group-item">Compiler design</li></div>
                </div>
                <div className="row">
                    <div className="col-sm-4 list-group"><li className="list-group-item">Data structures</li></div>
                    <div className="col-sm-4 list-group"><li className="list-group-item">Design and Analysis of Algorithms.</li></div>
                    <div className="col-sm-4 list-group"><li className="list-group-item">Computer Architecture and Organisation</li></div>
                </div>
            </div>
            {/* course help container end */}

            {/* Course help form */}
            <div className="Course__help__form container">
               <h3 className="Course__help__title">Submit Your Course Query Here</h3>
               <hr style={{borderTop:"2px dotted white"}}/>

               <form className="container form__container col-sm-8" onSubmit={changeClick} encType="multipart/form-data">
                    <div className="form-group">
                        <label for="email">Email: </label>
                        <input type="email" name={email} onChange={(e) => SetEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email"/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label for="title">Course Title: </label>
                        <input type="text" name={title} onChange={(e) => SetTitle(e.target.value)} className="form-control" id="title" placeholder="Enter course title"/>
                    </div> 
                    <div className="form-group col-sm-6">
                        <label for="title">Course Type: </label>
                        <input type="text" name={type} onChange={(e) => SetType(e.target.value)} className="form-control" id="title" placeholder="Enter course type"/>
                    </div> 
                    
                    <div className="form-group">
                        <label for="desc">Course Description</label>
                        <textarea type="text" rows="3" name={desc} onChange={(e) => SetDesc(e.target.value)} className="form-control" id="desc" placeholder="Enter course description"/>
                    </div>
                  
                    <div className="form-group">
                        <label for="deadline">Deadline</label>
                        <input type="date" name={deadline} onChange={(e) => SetDeadline(e.target.value)} className="form-control" id="deadline"/>
                    </div> 
                    <div className="form-group">
                        <input type="file" filename="image" onChange={onChangeFile} placeholder="image"/>
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
           </div>
        </>
    )
}

export default Course_help
