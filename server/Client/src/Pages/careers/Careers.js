import React, { useState, useEffect } from 'react'
import './Careers.css'

function Careers() {
    const [Data, setData] = useState(null)
    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getcarrer");
            const data = await res.json();
            console.log(data)
            // store the data into our Data variable
            setData(data);
        }
    }, []);
    return (
        <>
            <div className="careers__header">
                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcmVlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="img-responsive" alt=".." />
                <div className="careers__header__text">
                    <h1>Join Us</h1>
                    <h4 className="text-justify"> Excel your professional career with Profese today. Be with a group of people who work hard, stand together and laugh a lot. </h4>
                </div>
            </div>

            <div className="careers__container container">
                <div className="careers__about__us">
                    <h3 className="text-primary about__us__title">Who we are?</h3>
                    {/* change this with original content */}
                    <h4 className="text-justify">
                        Profese is an online learning platform developed by a team of educators that provides flexible courses based on your study needs. It is a tool developed to make teaching and learning experiences more student-centered and innovative.
                        We believe blended-learning is more beneficial for a learner than flipped-learning so most of our courses are a combination of online lectures, assignments, quizzes, and face-to-face learning.
                        Our main objective is to empower the course taker to think beyond his books and enjoy the overall learning process. Our instructors come from diverse backgrounds across the globe.
                        They are here to be your life coach and not just lecturers or educators. Profese is here to take you beyond your books. It's a learning experience you will never regret. To learn more feel free to contact our multilingual team today. We would be happy to assist you!
                    </h4>
                </div>


                {/* <div className="careers__why__join">
                    <h3 className="text-primary why__join__title">Why join us?</h3>
                    <iframe width="550" height="315" src="https://www.youtube.com/embed/DrRzK5-2-b8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <iframe width="550" height="315" src="https://www.youtube.com/embed/DrRzK5-2-b8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div> */}


                {/* job openings */}''
                <div className="careers__job__openings container">
                    {/* implement backend here */}
                    <h2 className="job__openings__title">Job Openings</h2>
                    <hr style={{ borderTop: "5px solid #153280" }} />

                    {/* job row start loop over this row only remove others */}
                    <div className="row">
                        {Data && (
                            <>
                                {/* loop over the Data */}
                                {Data.map((i, index) => (
                                    <div className="job__opening col-sm-6">
                                        <div className="job__opening__content">
                                            <h3 className="job__role">{i.name}</h3>
                                            <p className="job__Desc">{i.body}</p>
                                            <div className="job__details">
                                                <p className="job__type"><i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;{i.type}</p>
                                                <p className="job__location"><i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp;{i.location}</p>
                                                <p className="job__experience"><i class="fa fa-briefcase" aria-hidden="true"></i> Exp: &nbsp;{i.experience}</p>
                                            </div>
                                        </div>
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

export default Careers
