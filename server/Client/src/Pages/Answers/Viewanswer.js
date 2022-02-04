
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'
import Disscussion_filter from './Disscussion_filter'

import axios from 'axios'
const Viewanswer = (props) => {


    const [data, SetData] = useState('')
    const [Filter, setFilter] = useState('')
    const [showFilter, setshowFilter] = useState(false)
    const [Cat, setCat] = useState([]);
    // filters

    const changeFilter = (filter) => {
        setshowFilter(true)
        setFilter(filter)
    }

    const hideFilter = () => {
        setshowFilter(false)
    }
    // geting data by id
    useEffect(() => {
        getData1();
        axios.get(`/viewanswer/${props.match.params.id}`).then(res => [
            SetData(res.data)
        ])
            .catch(error => console.log(error));

        async function getData1() {
            const res = await fetch("/getcategory");
            const data1 = await res.json();
            // store the data into our Data variable
            setCat(data1)
        }
    }, []);

    // upload ing data to another database
    // file

    // if user not logged in or logged in

    //like or unlike post   
    const likePost = (id) => {
        console.log("like button clicked")
        fetch('/likeans', {
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer" + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,

            })

        }).then(res => res.json())
            .then(result => {
                console.log(result)


            }).catch(err => {
                console.log(err)
            })
    }
    //   ulike the post

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2 links">
                    <h4 className="text-primary"><strong> Question</strong></h4>
                    <div className="list-group">
                        <Link to="/discussion" className="list-group-item">Read Question</Link>

                        <Link to="/ask" className="list-group-item">Ask Question</Link>
                    </div>
                    {/* <h4 className="text-primary"><strong>Services</strong></h4>
                    <div className="list-group">
                        <Link to="/assignment-help" className="list-group-item">Assignment help</Link>

                        <Link to="/course-help" className="list-group-item">Course help</Link>
                        <Link to="/live-sessions" className="list-group-item">Live sessions</Link>
                        <Link to="/practice-exam" className="list-group-item">Exam prep</Link>
                    </div> */}
                    <h4 className="text-primary"><strong>Filters by Subject</strong></h4>
                    <div className="list-group">

                        {
                            Cat.map((i, index) => (
                                <div key={index}><Link to="#" onClick={() => changeFilter(`${i.category}`)} className="list-group-item">{i.category}</Link></div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-sm-10 cont">
                    {
                        showFilter ? <Disscussion_filter hideFilter={hideFilter} filtername={Filter} /> :
                            <div className="question col-sm">
                                <h1 className="queheading">Question: {data.question}</h1>
                                <div className="image">
                                    {/* <img className="img-responsive img-rounded" src={`/uploads/${data.queimg}`}></img> */}
                                    {/* image is not getting fetched from server thusmage for now,, check this what is happening */}
                                    <img
                                        className="img-responsive img-rounded"
                                        src='https://media.istockphoto.com/photos/crash-tes using dummy ih-dummy-in-car-picture-id1209793467?b=1&k=20&m=1209793467&s=170667a&w=0&h=0aacX0EoFndZv-w-j5BQN9iV48o3mZzfgpbsjWQ4iLo='
                                        alt='blog banner' />
                                </div>
                                <div className="con row">
                                    {/* <div className="discussion__like__dislike col-xs-2">
                                        <div align="center"><i className="fa fa-caret-up" aria-hidden="true" style={{ fontWeight: "bold", fontSize: "24px" }}></i></div>
                                        <div className='discussion__like__count' align="center" style={{ fontWeight: "bold" }}>5</div>
                                        <div align="center"><i className='fa fa-caret-down' aria-hidden="true" style={{ fontWeight: "bold", fontSize: "24px" }}></i></div>
                                    </div> */}
                                    <h4 className="col text-success"><i className="fa fa-check-circle-o" onClick={() => { likePost(data._id) }}></i> {data && data.likes.length}</h4>
                                    <h4 className="col text-danger">On: {data.date}</h4>
                                </div>
                                <div className="con row">
                                    <h4 className="col text-primary">By: {data.name}</h4>
                                    <h4 className="col text-warning">Subject: {data.subject}</h4>
                                </div>

                                <h5 className="answer"><strong>Answer:</strong> {data.answer}</h5>
                                <div className="image">
                                    {/* <img src={`/uploads/${data.articleImage}`} className="img-responsive img-rounded"></img> */}
                                    {/* image is not getting fetched from server thusmage for now,, check this what is happening */}
                                    <img
                                        className="img-responsive img-rounded"
                                        src='https://media.istockphoto.com/photos/crash-tes using dummy ih-dummy-in-car-picture-id1209793467?b=1&k=20&m=1209793467&s=170667a&w=0&h=0aacX0EoFndZv-w-j5BQN9iV48o3mZzfgpbsjWQ4iLo='
                                        alt='blog banner' />
                                </div>
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}


export default Viewanswer