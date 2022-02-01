import React,{useState , useEffect} from 'react'
import axios from 'axios'
import './Service.css'
import { useHistory} from 'react-router-dom'
function Assignment_help() {
    
    const [email, SetEmail] = useState("")
    const [title,SetTitle]=useState("")
    const[desc,SetDesc]=useState("")
    const[type,SetType]=useState("")
    const [deadline, SetDeadline] = useState("")
    const [price, setprice] = useState(0)
    const [fileName, SetFileName] = useState("")
    const history = useHistory()
    // select total question
    const changeprice = (e) => {
        setprice(e.target.value)
      }
    // file
    const onChangeFile = (e) => {
        SetFileName(e.target.files[0]);
    }
     // adddata
     const submit = (e) => {
      
       if(!email || !title || !desc || !type ||!deadline ||!fileName){
           window.alert("Feilds Cannot Be Empty ")

       }else{
        const formData = new FormData();
        formData.append("email", email);
        formData.append("desc", desc);
        formData.append("type", type);
        formData.append("deadline", deadline);
        formData.append("title", title);
        formData.append("price" , price);
       
        formData.append("image", fileName);
        setprice("");
        SetEmail("");
        SetTitle("");
        SetDesc("");
        SetType("");
        SetDeadline("");
       
        axios.post("/addasignment", formData).then((res) =>
        window.alert(res.data),
        history.push('/profile')
        )


            .catch((err) => {
               console.log(err)
            });

       }
    };

    // 
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
           <div className="assignment__help container">
               <h3 className="text-primary assignment__help__title">Assignment Help</h3>
               <hr style={{borderTop:"2px dotted #153280"}}/>
               <p className="assignment__help__desc text-justify">
                   Profese provides best assignment help service by a team of expert tutors. Assignment help is ideal for students who need guidance through specific
                   assignments, like homework, projects, and labs. Out tutors will ensure you achieve the highest marks and give you a deeper 
                   understanding of the material with thorough explanations.
               </p>
           </div>

           {/* assignment help container start */}
           <div className="assignment__help__content container">
               <h3 className="text-primary assignment__help__title">Assignment Help Services</h3>
               <hr style={{borderTop:"2px dotted #153280"}}/>

                {/* keep these three col-m-4 divs just apply loop inside them */}
                <div className="col-sm-4">  
                    <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Programming Assignment Help</h4>
                        <div className="list-group">
                            <li className="list-group-item">Java assignment help</li>
                            <li className="list-group-item">C++ assignment help</li> 
                            <li className="list-group-item">Python assignment help</li> 
                            <li className="list-group-item">C assignment help</li>  
                            <li className="list-group-item">DSA assignment help</li>     
                        </div> 
                    </div>
                </div>

                <div className="col-sm-4">
                    {/* just keep one assignment help type div and apply loop */}
                    <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Computer Science Assignment Help</h4>
                        <div className="list-group">
                            <li className="list-group-item">DBMS Assignment Help</li> 
                            <li className="list-group-item">OS Assignment Help</li> 
                            <li className="list-group-item">Computer organisation Assignment Help</li>  
                        </div> 
                    </div> 
                    <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Web Developement Assignment Help</h4>
                        <div className="list-group">
                            <li className="list-group-item">HTML Assignment Help</li> 
                            <li className="list-group-item">CSS Assignment Help</li> 
                            <li className="list-group-item">Javascript Assignment Help</li>  
                        </div> 
                    </div> 
                </div>

                <div className="col-sm-4">
                    {/* just keep one assignment help type div and apply loop */}
                    <div className="assignment__help__type">
                        <h4 className="assignment__help__type__title">Computer Science Assignment Help</h4>
                        <div className="list-group">
                            <li className="list-group-item">Discrete mathematics assignment help</li> 
                            <li className="list-group-item">Design and Analysis of Algorithms assignment help</li> 
                            <li className="list-group-item">Automata theory assignment help</li> 
                            <li className="list-group-item">Compiler design assignment help</li>  
                        </div> 
                    </div> 
                </div>
           </div>
           {/* assignment help container end */}


           {/* assignment help form */}
           <div className="assignment__help__form container">
               <h3 className="assignment__help__title">Submit Your Assignment Query Here</h3>
               <hr style={{borderTop:"2px dotted white"}}/>

                <form className="container form__container col-sm-8" onSubmit={submit} encType="multipart/form-data">
                    <div className="form-group">
                        <label for="email">Email: </label>
                        <input type="email" name={email} onChange={(e) => SetEmail(e.target.value)} className="form-control" id="email" placeholder="johndoe@gmail.com"/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label for="title">Assignment Subject: </label>
                        <input type="text" name={title} onChange={(e) => SetTitle(e.target.value)} className="form-control" id="title" placeholder="Enter assignment subject eg:Data Structures"/>
                    </div> 
                    <div className="form-group col-sm-6">
                        <label for="title">Assignment Title: </label>
                        <input type="text" name={type} onChange={(e) => SetType(e.target.value)} className="form-control" id="title" placeholder="Enter assignment title eg:Array"/>
                    </div> 
                    
                    <div className="form-group">
                        <label for="desc">Assignment Description</label>
                        <textarea type="text" rows="3" name={desc} onChange={(e) => SetDesc(e.target.value)} className="form-control" id="desc" placeholder="Enter assignment description"/>
                    </div> 
                     {/* select */}
                     <div className="form-group">
             <label className="control-label " for="rating">Total Questions: &nbsp;&nbsp;&nbsp;&nbsp;  </label>
             
              <label class="radio-inline">
      <input type="radio" name="optradio" value="100 " onChange={changeprice}/>0-10
    </label>
    <label class="radio-inline">
      <input type="radio" name="optradio"  value="200" onChange={changeprice} />10-20
    </label>
    <label class="radio-inline">
      <input type="radio" name="optradio"  value="300" onChange={changeprice} />20-30
    </label>
    <label class="radio-inline">
      <input type="radio" name="optradio"  value="400" onChange={changeprice} />30-40
    </label>
    <label class="radio-inline">
      <input type="radio" name="optradio"  value="500" onChange={changeprice} />40-50
    </label>
             </div>
         
                     {/* select radio */}

                    {/* file */}
                    <div className="form-group">
                        <input type="file" filename="image" onChange={onChangeFile} placeholder="image"/>
                    </div>
                    {/* files */}
                    <div className="form-group">
                        <label for="deadline">Deadline</label>
                        <input type="date" name={deadline} onChange={(e) => SetDeadline(e.target.value)} className="form-control" id="deadline"/>
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

export default Assignment_help
