
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import "./Discussion.css"
import axios from 'axios'
export const View = (props) => {
 
  const history = useHistory()

  const [question, SetQuestion] = useState('')
  const [subject, SetSubject] = useState('')
  const [name, SetName] = useState('')
  const [answer, SetAnswer] = useState('')
  const [quefile ,SetQuefile]=useState('')
  const [fileName, SetFileName] = useState("")
  // geting data by id
 
  useEffect(() => {
    axios.get(`/view/${props.match.params.id}`).then(res => [
      SetQuestion(res.data.question),
      SetSubject(res.data.subject),

      SetQuefile(res.data.articleImage)

    ])
      .catch(error => console.log(error));

  }, [props]);

  // upload ing data to another database
  // file
  const onChangeFile = (e) => {
    SetFileName(e.target.files[0]);
  }
  // adddata
  const changeClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("articleImage", fileName);
    formData.append("queimg",quefile);
    SetName("");
    SetSubject("");
    SetQuestion("");
    SetAnswer("");
    SetQuefile("");
   
    axios.post("/answer", formData).then((res) =>
    window.alert(res.data),
    history.push('/answers')
    )


      .catch((err) => {
        console.log(err);
      });

  };
  // if user not logged in or logged in
  const callProfilepage =async()=>{
    try{
        const res=await fetch("/about",{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
    });
    const data=await  res.json();
    
   
    SetName(data.name);
    
    if(!res.status===200){
        const error=new Error(res.error);
        throw error;
    }
    
    }catch(err){
    console.log(err)
    
    window.alert("Please Login First")
    history.push('/login')
    }
       }
       
        useEffect(() => {
            callProfilepage()
        })
        
  return (
    <div className="disscussion_board container">

      <div className="discussion_filter col-sm-2">


        <h4 className="text-primary"><strong></strong></h4>
        <div className="list-group">

          <Link to="/discussion" className="list-group-item">Back</Link>
         
        </div>
        <h4 className="text-primary"><strong></strong></h4>
        <div className="list-group">
          <Link to="/answers" className="list-group-item">Read Answers</Link>
         
          {/*  */}
        </div>
        {/* <h4 className="text-primary"><strong>Filters</strong></h4> */}


      </div>
 
      <div className="discussion_feed  col-sm-8">
                    {/* complete div|||| */}
                    <div className="discussion__feed__new container-fluid">
                        {/* add question field */}
                        <div className="discussion__feed__new__header"> 
                            <image src="https://www.bing.com/th?id=OIP.gxn_fMRYjgGPp7I9lh81FgHaGS&w=153&h=133&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
                                className="img-circle img-responsive" placeholder="ques banner"
                                alt="profile image" ></image>
                            <h4>&nbsp;<strong>Welcome {name} !!! Submit your valuable answer here</strong>&nbsp;&nbsp;</h4>
                        </div>
                        
                    </div>
                    <div className="discussion__content container-fluid">
            <h3 className="text-primary">Submit Your Valuable Answer</h3>
            {/* question field starts here */}

            <form onSubmit={changeClick} encType="multipart/form-data" >
              <div className="discussion__add__ans__form">
                <textarea
                  value={question}
                  name="new_ques"
                  className="form-control"
                  rows="2"
                  onChange={(e) => SetQuestion(e.target.value)}
                  type="text"
                />
                <input
                  name="new_ques"
                  className="form-control"
                   
                  type="text" value={subject}
                  onChange={(e) => SetSubject(e.target.value)}
                />
                <input
                  value={name ? name:" no user found !! login first"}
                  onChange={(e) => SetName(e.target.value)}
                  className="form-control"
                  placeholder="your name"
                  type="text"

                />
                <textarea
                  rows="2"
                  name="new_ques"
                  className="form-control"
                  placeholder="Enter your answer here"
                  type="text" value={answer} onChange={(e) => SetAnswer(e.target.value)}
                  required
                />
                <input type="file" filename="articleImage" onChange={onChangeFile}
                  required
                />
                <div className="discussion__add__ans__attachments">


                  <input
                    type="submit"
                    value="Post Answer"
                    className="btn btn-primary" />
                </div>
              </div>
            </form>
          </div>
        {/* form */}
        {/* form  */}

      </div>


      <div className="discussion_tips col-sm-2">
        <h3><strong>Tips <i className="fa fa-lightbulb-o" aria-hidden="true"></i></strong></h3>
        <hr style={{ borderColor: "yellow" }} />
        <div className="panel panel-default">
          <div className="panel-body">Make sure your question is concise</div>
          <div className="panel-body">Upload pictures, diagrams of nessecary!</div>
          <div className="panel-body">Use formal language and double check spellings</div>
        </div>
      </div>
    </div>

  )
}


