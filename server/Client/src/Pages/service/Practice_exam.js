import React,{useState , useEffect} from 'react'
import "./Service.css"
import axios from 'axios'
import { useHistory} from 'react-router-dom'
function Practice_exam() {
    const history = useHistory()
    const [email, SetEmail] = useState("")
    const [subject,SetSubject]=useState("")
    const[topic,SetTopic]=useState("")
   
    const [date, SetDate] = useState("")
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
       if(!email || !subject ||!topic || !date || !fileName){
           window.alert("Feilds Cannot Be Empty")

       }else{
           
        const formData = new FormData();
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("topic", topic);
        formData.append("date", date);
        formData.append("price" ,price);
     
        formData.append("image", fileName);
        SetEmail("");
        setprice("");
        SetSubject("");
        SetTopic("");
    
        SetDate("");
        axios.post("/exam", formData).then((res) =>
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
            {/* practice exam header */}
             {/* practice exam header */}
             <div className="practice__exam container">
               <h3 className="text-primary practice__exam__title">Practice Exam</h3>
               <hr style={{borderTop:"2px dotted #153280"}}/>
               <p className="practice__exam__desc text-justify">
                 Practice Exams are best for students who are confidents enough with course material to start
                 trying problems on theri own but may need some guidance through challenging problems or test-taking strategies.
                 Our tutors will give you the practice and guidance you need to ace your next exam.  
               </p>
            </div>
            {/* practice exam header end */}


            {/* Practice Exam container start */}
           <div className="practice__exam__content container">
               <h3 className="text-primary practice__exam__title">Practice Exam Services</h3>
               <hr style={{borderTop:"2px dotted #153280"}}/>

                {/* keep these three col-m-4 divs just apply loop inside them */}
                <div className="col-sm-4"> 
                    <div className="practice__exam__type">
                        <h4 className="practice__exam__type__title">Programming Practice Exam</h4>
                        <div className="list-group">
                            <li className="list-group-item">Java Practice Exam</li>
                            <li className="list-group-item">C++ Practice Exam</li> 
                            <li className="list-group-item">Python Practice Exam</li> 
                            <li className="list-group-item">C Practice Exam</li>  
                        </div> 
                    </div>
                </div>

                <div className="col-sm-4"> 
                    <div className="practice__exam__type">
                        <h4 className="practice__exam__type__title">DBMS Practice Exam</h4>
                        <div className="list-group">
                            <li className="list-group-item">SQL Practice Exam</li> 
                            <li className="list-group-item">NoSQL Practice Exam</li> 
                            <li className="list-group-item">Join Practice Exam</li>  
                        </div> 
                    </div>

                    <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Computer Science Practice Exam</h4>
                        <div className="list-group">
                            <li className="list-group-item">Computer Network Practice Exam</li> 
                            <li className="list-group-item">OS Practice Exam</li> 
                            <li className="list-group-item">Computer organisation Practice Exam</li>  
                        </div> 
                    </div> 
                </div>

                <div className="col-sm-4"> 
                   <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Web Developement Practice Exam</h4>
                        <div className="list-group">
                            <li className="list-group-item">HTML Practice Exam</li> 
                            <li className="list-group-item">CSS Practice Exam</li> 
                            <li className="list-group-item">Javascript Practice Exam</li>  
                        </div> 
                    </div>
                    <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Computer Science Practice Exam</h4>
                        <div className="list-group">
                            <li className="list-group-item">Discrete mathematics Practice Exam</li> 
                            <li className="list-group-item">Design and Analysis of Algorithms Practice Exam</li> 
                            <li className="list-group-item">Automata theory Practice Exam</li> 
                            <li className="list-group-item">Compiler design Practice Exam</li>  
                        </div> 
                    </div> 
                </div>
           </div>
           {/* Practice Exam container end */}


           {/* Practice Exam form */}
           <div className="practice__exam__form container">
               <h3 className="practice__exam__title">Schedule your Practice Exam</h3>
               <hr style={{borderTop:"2px dotted white"}}/>
              

               <form className="container form__container col-sm-8" onSubmit={changeClick} encType="multipart/form-data">
                    <div className="form-group">
                        <label for="email">Email: </label>
                        <input type="email" name={email} onChange={(e) => SetEmail(e.target.value)} className="form-control" id="email" placeholder="Enter email"/>
                    </div> 

                    <div className="form-group">
                        <label for="title">Practice Exam Subject: </label>
                        <input type="text" name={subject} onChange={(e) => SetSubject(e.target.value)} className="form-control" id="title" placeholder="Enter Practice Exam subject"/>
                    </div>  

                    <div className="form-group">
                        <label for="topic">Practice Exam Topic:</label>
                        <input type="text" name={topic} onChange={(e) => SetTopic(e.target.value)} className="form-control" id="topic" placeholder="Enter practice exam topic" />
                    </div>
               
                    <div className="form-group">
                        <label for="date">Date and time:</label>
                        <input type="datetime-local" name={date} onChange={(e) => SetDate(e.target.value)} className="form-control" id="date"/>
                    </div> 

                    <div className="form-group">
                        <label for="file">Reference document</label>
                        <input type="file" filename="image" onChange={onChangeFile} placeholder="image" />
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

export default Practice_exam
