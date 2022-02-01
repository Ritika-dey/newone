
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Disscussion_filter from './Disscussion_filter'
import "./Discussion.css"
import { useHistory, Link } from 'react-router-dom'
export const Ask = () => {
    // const { state, dispatch } = useContext(UserContext);
    const [cat, setCat] = useState([])
    const [Filter, setFilter] = useState('')
    const [showFilter, setshowFilter] = useState(false)
    const [category, setCategory] = useState('')
    const history = useHistory()


    const [question, SetQuestion] = useState("")
    const [subject, SetSubject] = useState("")
    const [name, SetName] = useState({})
    const [fileName, SetFileName] = useState("")

    // file
    const onChangeFile = (e) => {
        SetFileName(e.target.files[0]);
    }
    // adddata
    const changeClick = (e) => {

        if (!subject || !question) {
            window.alert("please Enter All Feilds")
        } else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("subject", subject);
            formData.append("question", question);
            formData.append("articleImage", fileName);
            SetName("");
            SetSubject("");
            SetQuestion("");

            axios.post("/add", formData).then((res) =>
                window.alert(res.data),
                history.push('/discussion')
            )
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // if user not logged in
    // 
    // categories
    const getcat = async () => {

        const res = await fetch("/getcategory");
        const data = await res.json();

        // store the data into our Data variable
        setCat(data);

    }
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
            const data = await res.json();


            SetName(data.name);

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
        getcat();
        callProfilepage()
    })



    // filters
    const changeFilter = (filter) => {
        setshowFilter(true)
        setFilter(filter)
    }

    const hideFilter = () => {
        setshowFilter(false)
    }

    // add Subject
    const Add = () => {
        if (!category) {
            window.alert("Please Add Category Field Cannot Be Empty")
        }
        else {
            const articles = {
                category
            }
            setCategory();
            axios.post("/category", articles).then
                (
                    res =>
                        window.alert("Category Added"),

                )
                .catch(err => {
                    // wind("Category Allready Exists")
                    window.alert("Category Allready Exists")
                })
        }
    }
    return (

        <>
            <div className="disscussion_board container">
                <div className="discussion_filter col-sm-2">


                    <h4 className="text-primary"><strong> For Questions</strong></h4>
                    <div className="list-group">

                        <Link to="/discussion" className="list-group-item">Read Questions</Link>
                        <Link to="/answers" className="list-group-item">Read Answers</Link>


                    </div>
                    {/* <div className="list-group">
                        <Link to="/assignment-help" className="list-group-item">Assignment help</Link>

                        <Link to="/course-help" className="list-group-item">Course help</Link>
                        <Link to="/live-sessions" className="list-group-item">Live sessions</Link>
                        <Link to="/practice-exam" className="list-group-item">Exam prep</Link>
                    </div> */}


                    <h4 className="text-primary"><strong>Example Subjects</strong></h4>
                    <div className="list-group">
                        {cat.map((i, index) => (
                            <div ley={index}><Link to="#" onClick={() => changeFilter(`${i.category}`)} className="list-group-item">{i.category}</Link></div>

                        ))}
                    </div>
                </div>



                {
                    showFilter ? <Disscussion_filter hideFilter={hideFilter} filtername={Filter} /> :


                        <div className="discussion_feed  col-sm-8">
                            {/* complete div|||| */}

                            <div className="discussion__content container-fluid">
                                <h3 className="text-primary">Ask questions Or put up a question !!!</h3>
                                {/* question field starts here */}

                                <form onSubmit={changeClick} encType="multipart/form-data" >
                                    <input type="text" value={name ? name : "no user found login first"} onChange={(e) => SetName(e.target.value)} className="form-control"
                                        placeholder="Enter your name here" /> <br />
                                    {/* <input type="text" name={subject} onChange={(e) => SetSubject(e.target.value)} className="form-control"
                                placeholder="Enter subject here"  /> <br /> */}
                                    <div className='row'>

                                        <div className='col-sm-8'><select id="sel2" value={subject}
                                            className="form-control"
                                            onChange={(e) => SetSubject(e.target.value)} >
                                            <option>Select Subject/Title</option>
                                            {cat.map((i, index) => (
                                                <option key={index}>{i.category}</option>

                                            ))}
                                        </select></div>
                                        <div className='col-sm-4'><button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Add New Subject</button>
                                            {/* modal */}
                                            <div id="myModal" className="modal fade" role="dialog">
                                                <div className="modal-dialog">


                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                            <h4 className="modal-title">Add New Subject</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control"
                                                                placeholder="Enter New Subject " /> <br />

                                                            <input
                                                                onClick={Add}
                                                                value="Add"
                                                                className="btn btn-primary" />

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* modal */}



                                        </div>
                                    </div><br />
                                    <textarea
                                        rows="2" name={question} onChange={(e) => SetQuestion(e.target.value)} className="form-control"
                                        placeholder="Enter your Question here" /> <br />

                                    <input type="file" filename="articleImage" onChange={onChangeFile} /><br />
                                    <input
                                        type="submit"
                                        value="Post Question"
                                        className="btn btn-primary" />

                                </form>

                                {/* div ends for displaying question */}
                            </div>






                            {/* warnig and Form closes */}



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
