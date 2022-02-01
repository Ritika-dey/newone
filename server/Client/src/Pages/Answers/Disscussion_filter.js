/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import './Answer.css'
import { Link } from 'react-router-dom'

function Disscussion_filter(props) {
    const [Data, setData] = useState(null); 

    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/filteranswer/" + props.filtername);
            const data = await res.json();
            console.log(data)
            // store the data into our Data variable
            setData(data);
        }
    },[]);
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
                console.log(result)


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
    return (
        <>
            <div className="discussion_feed col-sm-8">
                <button className="btn btn-default" onClick={props.hideFilter}><i className="fa fa-arrow-circle-left"></i> Back</button>
                <div className="discussion__content container-fluid">
                    <h3 className="text-primary">{props.filtername} questions answers for you</h3>
                    <div className="discussion__ques">


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

                                                <div className="discussion__que__anscnt text-primary"><i className="fa fa-tag" aria-hidden="true"></i>{i.subject}</div>
                                                <div className="discussion__que__likes text-success">{i && i.likes.length} <i className="fa fa-thumbs-up" onClick={() => { likePost(i._id) }}></i> </div>
                                                <div className="discussion__que__dislikes text-danger">{i && i.likes.length} <i className="fa fa-thumbs-down" onClick={() => { unlikePost(i._id) }}></i></div>
 
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



                    </div>
                </div>
            </div>
        </>
    )
}

export default Disscussion_filter
