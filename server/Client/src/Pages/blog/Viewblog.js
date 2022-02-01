import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import './Blog.css'
import { Link } from 'react-router-dom'
export default function Viewblog(props) {
    const [data, SetData] = useState('')
    useEffect(() => {
        axios.get(`/viewblog/${props.match.params.id}`).then(res => [
            //   SetQuestion(res.data.question),
            //   SetSubject(res.data.subject),

            //   SetFileName(res.data.articleImage)
            SetData(res.data)
        ])
            .catch(error => console.log(error));

    }, [props]);
    const makeComment = (text, postId) => {

        fetch('/comments', {
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer" + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                window.alert("thankyou for your valuable comment")
            }).catch(error => {
                console.log(error)
            })
    }
    const likePost = (id) => {
        console.log("like button clicked")
        fetch('/like', {
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
        <div>

            <div className="blog__single container-fluid">


                <div className="blog__single__content container">
                    {/* blog title */}
                    <h2 className="blog__single__title">{data.title}</h2><br />
                    <h5 className="blog__single__title">Category:-{data.subject}</h5>
                    <hr style={{ borderTop: "2px solid #153280" }} />

                    {/* blog banner image */}
                    <div className="blog__single__img" align="center">
                        <img className="img-responsive img-rounded" src={`/Blogs/${data.articleImage}`} alt="blog single banner" ></img>
                    </div>
                    <hr style={{ borderTop: "2px solid #153280" }} />

                    {/* blog body */}
                    <div className="blog__single__body">
                        <div className="col-xs-2 blog__single__sidebar">
                            <div className="blog__single__likes">
                                <p><i class="fa fa-heart" aria-hidden="true" onClick={() => { likePost(data._id) }}></i> {data && data.likes.length}</p>
                            </div>
                            <div className="blog__single__comments">
                                <p><i class="fa fa-comment" aria-hidden="true"></i> {data && data.comments.length}</p>
                            </div>
                        </div>
                        <div className="col-xs-10 blog__single__main">
                            <div className="blog__single__text">
                                <p className="text-justify" dangerouslySetInnerHTML={{__html: data.body}}></p>
                            </div>

                            {/* {"/viewblog/" + i._id} */}
                            <div className="blog__single__share">
                                <FacebookShareButton
                                    // replace the value of url with window.location.href while implementation 
                                    url={`https://www.sportsmadness247.com//viewblog/` + data._id}
                                    quote={"Read out our latest blog on Profese"}
                                    hashtag="#blog#blog_share" >
                                    <i className="fa fa-facebook"></i>
                                </FacebookShareButton>

                                <LinkedinShareButton
                                    // replace the value of source with window.location.href while implementation 
                                    url={`https://www.sportsmadness247.com//viewblog/` + data._id}
                                    title={"Read out our latest blog on Profese"}>
                                    <i className="fa fa-linkedin"></i>
                                </LinkedinShareButton>

                                <TwitterShareButton
                                    // replace the value of via with window.location.href while implementation 
                                    url={`https://www.sportsmadness247.com//viewblog/` + data._id}
                                    title={"Read out our latest blog on Profese"}
                                    hastags={"#blog#blog_share"}>
                                    <i className="fa fa-twitter"></i>
                                </TwitterShareButton>
                            </div>

                            <div className="blog__single__meta">
                                {/* got these info from backend */}
                                <p>By <i><b>{data.name}</b></i></p>
                                <p>Published on <b>{data.date}</b></p>
                            </div>


                            <hr style={{ borderTop: "1px solid black", marginBottom: "20px" }} />

                            <div className="blog__single__leave__comment">
                                <h1 className="blog__single__form__title">Leave a Comment</h1>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, data._id)
                                }}> 
                                    <input type="text" className="form-control gr" placeholder="Add Comment" id="usr" /> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
