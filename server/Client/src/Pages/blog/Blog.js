/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react'
import './Blog.css'
import Blog_row from './Blog_row'
import Blog_section from './Blog_section'

import { Link } from 'react-router-dom'


// filters
function Blog() {
    const [ShowSection, setShowSection] = useState(false)
    const [Section, setSection] = useState("")
    const [Data, setData] = useState(null)
    const [Cat, setCat] = useState([]);
    // + adding the use
    useEffect(() => {
        getData();
        getData1();
        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getblogs");
            const data = await res.json();
            console.log(data)
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

    const changeState = (section) => {
        setShowSection(!ShowSection)
        setSection(section)
    }

    return (
        <>
            <div className="blog container-fluid">
                {/* banner starts here */}
                <div className="blog__header container-fluid">
                    <div className="row">
                        <div className="blog__header__brand col-sm-8">
                            <Link to="/addblog"> <p>Blog</p></Link>
                        </div>
                        <div className="blog__header__search col-sm-4">

                        </div>
                    </div>
                    <div className="blog__featured">
                        <h2 className="blog__featured__title">Featured Posts</h2>
                        {/* fetching blogs and displaying the blogs and limit in sorted order */}

                        <div className="blog__featured__slides">
                            {Data && (
                                <>
                                    {/* loop over the Data */}
                                    {Data.map((i, index) => (
                                        <div className="blog__featured__slide col-sm-3" key={index}>
                                            <img
                                                className="blog-img"
                                                src={`/Blogs/${i.articleImage}`}
                                                alt="blog banner" >
                                            </img> 
                                            <h4>{i.title}</h4>
                                            <div className="blog__continue">
                                                <Link to={"/viewblog/" + i._id}><button className="btn btn-default">Continue reading </button></Link>
                                            </div>
                                        </div>

                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* banner ends here */}

                {/* blog section is used for more blogs */}
                {/* blogs ctegory starts here */}
                {
                    ShowSection ?
                        <Blog_section section={Section} changeState={changeState} />
                        :
                        <div className="blog__body container-fluid" style={{ marginTop: "20px" }}>
                            {
                                Cat.map((i, index) => (
                                    <div key={index}><Blog_row title={i.category} changeState={changeState} /></div>

                                ))
                            }
                        </div>
                }
                {/* blog category ends here */}
            </div>
        </>
    )
}

export default Blog
