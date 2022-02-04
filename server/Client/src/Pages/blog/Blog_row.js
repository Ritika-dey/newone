
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import './Blog.css'

function Blog_row(props) {

    // fetch blogs by subject or category
    const [Data, setData] = useState(null);
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/filterblogs/" + props.title);
            const data = await res.json();

            // store the data into our Data variable
            setData(data);
        }
    });

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
        <>
            {/* filter the row by category eg science, math , english etc props are passed from blog page   */}
            <div className="blog__row">
                {Data ?
                    <>
                        <h2 className="blog__row__title">{props.title}</h2>
                        <div className="blog__row__blogs">
                            {
                                Data.map((i, index) => (
                                    <div className="blog__row__blog" key={index}>
                                        <div className="row blog__meta">
                                            <div className="col-lg-8 col-xs-12">
                                                <p style={{ color: "black", padding: "10px" }}><span className="icon fa fa-user"></span> <strong>&nbsp;{i.name}</strong></p>
                                            </div>

                                            <div className="col-lg-4 col-xs-12">
                                                <Link to={"/viewblog/" + i._id} className="btn btn-primary" style={{ float: "right", margin: "10px" }}>Read Blog</Link>

                                            </div>
                                        </div>
                                        <div className="blog__row__content">
                                            <img
                                            src={`/Blogs/${i.articleImage}`} className="blog-img1"
                                            placeholder="blog banner" alt="...">
                                        </img>
                                            
                                            <h4 className="blog__title">
                                                <strong>{i.title.slice(0, 35)}...</strong>

                                            </h4>

                                            <div className="blog__desc" dangerouslySetInnerHTML={{ __html: i.body.slice(0, 75) }}></div>

                                            <div className="row blog__meta">
                                                <div className="col-lg-6 col-xs-12 like"><i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => { likePost(i._id) }}></i>&nbsp;{i.likes.length}</div>
                                                <div className="col-lg-6 col-xs-12 comment"><i className="fa fa-comments-o" aria-hidden="true"></i>&nbsp;{i.comments.length}</div>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            {/* end row coloumn */}

                            <div className="blog__row__more">
                                <button className="btn btn-default" onClick={() => { props.changeState(props.title) }}>More <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </>
                    :
                    <></>}
            </div>
        </>
    )
}

export default Blog_row
