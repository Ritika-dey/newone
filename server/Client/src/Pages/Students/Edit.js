
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Side from './Side';
import './main.css'

import axios from 'axios'
const Edit = (props) => {

  const history = useHistory()

  const [question, SetQuestion] = useState('')
  const [subject, SetSubject] = useState('')


  const [fileName, SetFileName] = useState("")
  // geting data by id
  useEffect(() => {
    axios.get(`/view/${props.match.params.id}`).then(res => [
      SetQuestion(res.data.question),
      SetSubject(res.data.subject),

      SetFileName(res.data.articleImage)

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

    formData.append("subject", subject);
    formData.append("question", question);

    formData.append("articleImage", fileName);

    SetSubject("");
    SetQuestion("");
    SetFileName("");

    axios.put(`/update/${props.match.params.id}`, formData).then((res) =>
      window.alert(res.data),
      // history.push('/myque')
    ) 
      .catch((err) => {
        console.log(err);
      });

  };
  // if user not logged in or logged in



  return (
    <div className="container-fluid">

      <div className="col-sm-3"> 
        <Side /> 
      </div> 
      <div className="col-sm-9 top">
        {/* complete div|||| */}

        <div className="discussion__content container-fluid">
          <h3 className="text-primary">Edit Your Valuable Question</h3>
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
                name="new_ques"
                className="form-control"

                type="text" value={fileName}

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



    </div>

  )
}


export default Edit