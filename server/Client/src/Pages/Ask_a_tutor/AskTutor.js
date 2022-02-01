import React, { useState } from 'react'
import './AskTutor.css'
import steps from './steps.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function AskTutor() {

    const [email, SetEmail] = useState("")
    const [query, SetQuery] = useState("")
    const [subject, SetSubject] = useState("")
    const [fileName, SetFileName] = useState("")
    const [Data, setData] = useState(null);
    // search
    const [search, setSearch] = useState('');

    const searchRecords = () => {
        axios.get(`/searchanswer/${search}`)
            .then(response => {

                setData(response.data);
            });

    }
    // file
    const onChangeFile = (e) => {
        SetFileName(e.target.files[0]);
    }
    const changeOnClick = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("query", query);
        formData.append("subject", subject);
        formData.append("image", fileName);

         
        axios.post("/addquery", formData)
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <div className="asktutor__container container-fluid">
                <div className="asktutor__header container-fluid">
                    <div className="asktutor__header__content container">
                        <h1 className="asktutor__header__title">Get solution of your queries by Expert tutors.</h1>
                        <h4>Stay ahead in your circle by clearing your doubts with subject experts.</h4>
                        <div className="input-group">
                            <input type="search" className="form-control" placeholder="Search Homework Solution Here" onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)} />
                            <div className="input-group-btn">
                                <button className="btn btn-primary" type="submit">
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                {/* search data */}
                <div className="discussion__content container">

                    {/* question field starts here */}
                    {Data ? Data && (
                        <>

                            {/* loop over the Data */}
                            {Data.map((i, index) => (
                                <div className="discussion__ques container " key={index}>
                                    <div className="discussion__que  ">
                                        <h4 className="discussion__que__title">Question:-{i.question}</h4>
                                        <h4 className="discussion__que__title">Answer:-{i.answer.slice(0, 85)}...<Link to={"/viewanswer/" + i._id}>Read More</Link></h4>
                                        <div className="discussion__que__anscnt "><p className="new">Subject: {i.subject}</p></div>
                                        <div className="discussion__que__anscnt "><p className="new"> Posted by: {i.name}</p></div>
                                    </div>
                                    <hr></hr>
                                    <hr></hr>
                                </div>
                            ))}

                        </>
                    ) : <>

                        <div className="asktutor__steps container">
                            <h1 className="asktutor__steps__title">Get solutions to your questions Now...!!!</h1>
                            <img className="img-responsive img-thumbnail" src={steps} alt="..."></img>
                        </div>

                        <div className="asktutor__form container">
                            {/* add aunthentication here first login or signup then only fill the form */}
                            <form className="form__container" onSubmit={() =>changeOnClick} encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="query">Email: </label>
                                    <input type="email" name={email} onChange={(e) => SetEmail(e.target.value)} className="form-control" id="query" placeholder="Enter your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="query">Subject: </label>
                                    <input type="text" name={subject} onChange={(e) => SetSubject(e.target.value)} className="form-control" id="query" placeholder="Enter subject Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="query">Query: </label>
                                    <input type="text" name={query} onChange={(e) => SetQuery(e.target.value)} className="form-control" id="query" placeholder="Enter your Query" />
                                </div>
                                <div className="form-group">
                                    <input type="file" filename="image" onChange={onChangeFile} placeholder="image" required />
                                </div>
                                {/* add subject field */}
                                <div className="form-group">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </div>
                            </form>
                        </div>
                    </>}
                    {/* div ends for displaying question */}
                </div>

            </div>
        </>
    )
}
