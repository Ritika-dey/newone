import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Blog_section(props) {
    // fetch blogs by subject or category
    const [Data, setData] = useState(null);

    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/filterblogs/" + props.section);
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
    //   ulike the post


    return (
        <>
            {/* blogs category starts */}
            {/* first row  */}
            {/* getiing section through props diffrent props and different blogs section */}
            <div className="blog__section container-fluid">
                <div className="blog__section__header">
                    <button className="blog__Section__back btn btn-default" onClick={props.changeState}><i className="fa fa-arrow-circle-left"></i> Back</button>
                    <h2>{props.section}</h2>
                </div>

                <div className="blog__section__content container">
                    <div className="row blog__section__row">

                        {Data && (
                            <>
                                {/* loop over the Data */}
                                {Data.map((i, index) => (

                                    <div className="blog__section__blog col-sm-6" key={index}>
                                        <div class="row blog__meta">
                                            <div class="col-lg-8 col-xs-12">
                                                <p style={{ color: "black", padding: "10px" }}><span class="icon fa fa-user"></span> <strong>Posted By:-{i.name}</strong></p>
                                            </div>
                                            <div class="col-lg-4 col-xs-12">
                                                <Link to={"/viewblog/" + i._id} class="btn btn-primary" style={{ float: "right", margin: "10px" }}>Read Blog</Link>
                                            </div>
                                        </div>
                                        <div className="blog__row__blog">
                                            <div className="blog__row__content">

                                                <img
                                                    src={`/Blogs/${i.articleImage}`} className="blog-img1"
                                                    placeholder="blog banner" alt="...">
                                                </img>

                                                <h4 class="blog__title">
                                                    <strong>{i.title.slice(0, 75)}...</strong>
                                                </h4>

                                                <div class="blog__desc">
                                                    {i.body.slice(0, 75)}...
                                                </div>

                                                <div className="row blog__meta">
                                                    <div className="col-lg-6 col-xs-12 like"><i class="fa fa-thumbs-up" aria-hidden="true" onClick={() => { likePost(i._id) }}></i>&nbsp;{i.likes.length}likes</div>
                                                    <div className="col-lg-6 col-xs-12comment"><i class="fa fa-comments-o" aria-hidden="true"></i>&nbsp;{i.comments.length}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            </>
                        )}
                    </div>


                    {/* second row */}


                    {/* third row */}
                </div>
            </div>
        </>
    )
}
