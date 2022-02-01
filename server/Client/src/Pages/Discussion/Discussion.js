/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Disscussion_filter from './Disscussion_filter'
import "./Discussion.css"
import axios from 'axios'
export default function Discussion() {
    const [Filter, setFilter] = useState('')
    const [showFilter, setshowFilter] = useState(false)
    // logic for fetching data
    const [Data, setData] = useState(null);
    const [Cat, setCat] = useState([]);
    // search
    const [search, setSearch] = useState('');

    const searchRecords = () => {
        axios.get(`/search/${search}`)
            .then(response => {
                setData(response.data);
            });

    }
    // + adding the use
    useEffect(() => {
        getData();
        getData1();
        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/get");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
        async function getData1() {
            const res = await fetch("/getcategory");
            const data1 = await res.json();

            // store the data into our Data variable
            setCat(data1)
        }
    }, []);
    // logic end

    const changeFilter = (filter) => {
        setshowFilter(true)
        setFilter(filter)
    }

    const hideFilter = () => {
        setshowFilter(false)
    }
    //   like dislike
    const likePost = (id) => { 
        fetch('/likeque', {
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
                window.alert("Thankyou for your feedback")
            }).catch(err => {
                console.log(err)
            })
    }

    //   ulike the post
    const unlikePost = (id) => {
        console.log("unlike button clicked")
        fetch('/unlikeque', {
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
    return (
        <>
            <div className="disscussion_board container">

                <div className="discussion_filter col-sm-2">
                    {/* <h4 className="text-primary"><strong>Services</strong></h4>
                    <div className="list-group">
                        <Link to="/assignment-help" className="list-group-item">Assignment help</Link>
                        <Link to="/course-help" className="list-group-item">Course help</Link>
                        <Link to="/live-sessions" className="list-group-item">Live sessions</Link>
                        <Link to="/practice-exam" className="list-group-item">Exam prep</Link>
                    </div> */}
                    <h4 className="text-primary"><strong> For Questions</strong></h4>
                    <div className="list-group">
                        <Link to="/answers" className="list-group-item">Read Answers</Link>
                    </div>
                    <h4 className="text-primary"><strong>Filters by Subject</strong></h4>
                    <div className="list-group">
                        {Cat.map((i, index) => (
                            <div ley={index}><Link to="#" onClick={() => changeFilter(`${i.category}`)} className="list-group-item">{i.category}</Link></div>
                        ))}
                    </div>
                </div>
                <div className="discussion_feed  col-sm-8">
                </div>
                {
                    showFilter ? <Disscussion_filter hideFilter={hideFilter} filtername={Filter} /> :
                        <div className="discussion_feed  col-sm-8">
                            {/* complete div|||| */}
                            <div className="discussion__feed__new container-fluid">
                                {/* add question field */}
                                <div className="discussion__feed__new__header">
                                    <h4>&nbsp;<strong>Search Question Here</strong>&nbsp;&nbsp;</h4>
                                </div>
                                <div className="discussion__feed__new__form">
                                    <input
                                        name="new_ques"
                                        className="form-control"
                                        placeholder="Enter your question here"
                                        type="text" onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="discussion__content container-fluid">
                                <div className="row">
                                    <h3 className="text-primary">Top questions for you &nbsp;&nbsp; <Link to="/ask"><button type="button" className="btn btn-primary qu">Ask Question</button></Link></h3>
                                </div>
                                {/* question field starts here */}
                                {Data && (
                                    <> 
                                        {Data.map((i, index) => (
                                            <div className="discussion__ques" key={index}>
                                                <div className="discussion__que"> 
                                                    <h4 className="discussion__que__title">{i.question}</h4> 
                                                    <div className='discussion__que__upper'>
                                                        <div className="discussion__que__likes text-success">{i && i.likes.length} <i className="fa fa-thumbs-up" onClick={() => { likePost(i._id) }}></i></div>
                                                        <div className="discussion__que__dislikes text-danger"><i className="fa fa-thumbs-down" onClick={() => { unlikePost(i._id) }}></i></div>
                                                    </div>
                                                    <img
                                                        className="img-responsive img-rounded"
                                                        src={`/uploads/${i.articleImage}`}
                                                        placeholder="ques banner">
                                                    </img>
                                                    <div className="discussion__que__meta">
                                                        <div className="discussion__que__anscnt text-primary"><i className="fa fa-edit " ></i> <Link to="/answers">&nbsp;Read Answer</Link></div>

                                                        <div className="discussion__que__anscnt text-primary"><i className="fa fa-tag" aria-hidden="true"></i>{i.subject}</div>
                                                    </div>
                                                    <div className='discussion__que__meta'>
                                                        <div className="discussion__que__addans text-primary"><i className="fa fa-plus" aria-hidden="true"></i><Link to={"/view/" + i._id}>&nbsp;Answer This Question</Link></div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        ))}

                                    </>
                                )}
                                {/* div ends for displaying question */}
                            </div>

                        </div>

                }

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
        </>
    )
}
