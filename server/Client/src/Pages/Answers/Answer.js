/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Disscussion_filter from './Disscussion_filter'
import "./Answer.css"
import axios from 'axios'
export default function Answer() {
    const [Filter, setFilter] = useState('')
    const [showFilter, setshowFilter] = useState(false)
    // logic for fetching data
    const [Data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [Cat, setCat] = useState([]);
    const searchRecords = () => {
        axios.get(`/searchanswer/${search}`)
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
            const res = await fetch("/getanswer");
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



            }).catch(err => {
                console.log(err)
            })
    }
    //   ulike the post
    const unlikePost = (id) => {
        console.log("unlike button clicked")
        fetch('/unlikans', {
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
    // search answers

    return (
        <>
            <div className="disscussion_board container">

                <div className="discussion_filter col-sm-2">


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
                        {Cat.map((i, index) => (
                            <div ley={index}><Link to="#" onClick={() => changeFilter(`${i.category}`)} className="list-group-item">{i.category}</Link></div>

                        ))}
                    </div>

                </div>

                {
                    showFilter ? <Disscussion_filter hideFilter={hideFilter} filtername={Filter} /> :




                        <div className="discussion_feed  col-sm-8">




                            <div className="discussion__content container-fluid">
                                <div className="discussion__feed__new container-fluid">
                                    {/* add question field */}
                                    <div className="discussion__feed__new__header">
                                        {/* 
                            <img src="https://www.bing.com/th?id=OIP.gxn_fMRYjgGPp7I9lh81FgHaGS&w=153&h=133&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
                                className="img-circle img-responsive" placeholder="ques banner"
                                alt="profile image" /> */}
                                        <h4>&nbsp;<strong>Search Answers Here</strong>&nbsp;&nbsp;</h4>
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
                                <div className="row">
                                    <h3 className="text-primary">Top questions answers for you &nbsp;&nbsp; <Link to="/ask"><button type="button" class="btn btn-primary qu">Ask Question</button></Link></h3>

                                </div>
                                {/* question field starts here */}
                                {Data && (
                                    <>

                                        {/* loop over the Data */}
                                        {Data.map((i, index) => (
                                            <div className="discussion__ques" key={index}>
                                                <div className="discussion__que">
                                                    <h4 className="discussion__que__title">Question:-{i.question}</h4>
                                                    <img
                                                        className="img-responsive img-rounded"
                                                        src={`/uploads/${i.queimg}`}
                                                        placeholder="ques banner">
                                                    </img>


                                                    <h4 className="discussion__que__title">Answer:-{i.answer.slice(0, 105)}...<Link to={"/viewanswer/" + i._id}>Read More</Link></h4>
                                                    <div className="discussion__que__meta">

                                                        
                                                        <div className="discussion__que__anscnt text-primary"><i className="fa fa-tag" aria-hidden="true"></i> {i.subject}</div>
                                                        <div className="discussion__que__likes text-success">{i && i.likes.length} <i className="fa fa-thumbs-up" onClick={() => { likePost(i._id) }}></i> </div>
                                                        <div className="discussion__que__dislikes text-danger"><i className="fa fa-thumbs-down" onClick={() => { unlikePost(i._id) }}></i></div>
 
                                                    </div>
                                                    <img
                                                        className="img-responsive img-rounded"
                                                        src={`/uploads/${i.articleImage}`}
                                                        placeholder="ques banner">
                                                    </img>

                                                </div>
                                                <hr /><hr />

                                            </div>


                                        ))}

                                    </>
                                )}
                                {/* div ends for displaying question */}
                            </div>
                            <hr></hr>
                            <hr></hr>


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
