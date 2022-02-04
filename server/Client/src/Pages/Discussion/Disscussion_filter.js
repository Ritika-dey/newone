/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import './Discussion.css'
import { Link } from 'react-router-dom'

function Disscussion_filter(props) {
    const [Data, setData] = useState(null);


    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/filterque/" + props.filtername);
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    });
    //   like dislike
    const likePost = (id) => {
        console.log("like button clicked")
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
            <div className="discussion_feed  col-sm-8"> 
                <div className="discussion__content container-fluid"> 
                    <div className="row">
                        <h3 className="text-primary">{props.filtername} questions answers for you&nbsp;&nbsp; <Link to="/ask"><button type="button" className="btn btn-primary qu">Ask Question</button></Link></h3>

                    </div>
                    {/* question field starts here */}
                    {Data && (
                        <>

                            {/* loop over the Data */}
                            {Data.map((i, index) => (
                                <div className="discussion__ques" key={index}> 
                                    <div className="discussion__que">
                                        <div className='discussion__que__upper'>
                                            <h4 className="discussion__que__title">{i.question}</h4>
                                        </div>
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
        </>
    )
}

export default Disscussion_filter
