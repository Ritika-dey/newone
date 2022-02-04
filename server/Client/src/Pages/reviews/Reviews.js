import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Reviews.css'

import ReviewFilter from './ReviewFilter'
import axios from 'axios'
function Reviews() {
  const user = "abc"
  const [leaveReview, setLeaveReview] = useState(false)
  const [name, setname] = useState('')
  const [university, setuniversity] = useState('')
  const [rating, setrating] = useState(0)
  const [review, setReview] = useState('')
  const [course, setcourse] = useState('')
  const [Filter, setFilter] = useState('')
  const [showFilter, setshowFilter] = useState(false)
  const [Data, setData] = useState(null)
  const giveReview = () => {
    setLeaveReview(!leaveReview)
  }

  const changeFilter = (filter) => {
    setshowFilter(true)
    setFilter(filter)
  }

  const hideFilter = () => {
    setshowFilter(false)
  }
  // add datra
  const changeOnClick = e => {
    e.preventDefault();

    const articles = {
      name,
      university,
      review,
      course,
      rating
    }
    setname("");
    setuniversity("");
    setReview("");
    setcourse("");
    setrating("");

    axios.post("/addreview", articles).then
      (
        res =>
          window.alert(res.data),
        window.location.reload()
      )
      .catch(err => {
        console.log(err)
      })
  }
  // radio
  const changeRating = (e) => {
    setrating(e.target.value)
  }
  // radio
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const res = await fetch("/filterreview");
      const data = await res.json();
      console.log(data);
      // store the data into our Data variable
      setData(data);
    }
  }, []);
  return (
    <>
      <div className="reviews__container container-fluid">
        <div className="reviews__header container-fluid">
          <div className="reviews__pill btn btn-primary">
            Reviews
          </div>
          <div className="reviews__header__content row">
            <div className="col-sm-8">
              <h2 className="text-primary text-justify"><strong>Read testimonials and reviews on services tailored towards our student's need</strong></h2>
            </div>
            <div className="reviews__new__btn col-sm-4">
              {leaveReview === false && user !== null && (
                <button onClick={giveReview} className="btn-lg btn-primary">Write a review</button>
              )}
              {leaveReview === true && user !== null && (
                <button
                  onClick={giveReview}
                  className="btn-lg btn-primary">
                  Back To Reviews
                </button>
              )}
            </div>
          </div>
        </div>

        {leaveReview === true && (

          <form className="form-horizontal container reviews__form" onSubmit={changeOnClick}>
            <div className="form-group">
              <label className="control-label col-sm-2" for="email">University: </label>
              <div className="col-sm-10">
                <input
                  value={university}
                  className="form-control"
                  onChange={(e) => setuniversity(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="email">Name: </label>
              <div className="col-sm-10">
                <input
                  value={name}
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="email">Course Or Services: </label>
              <div className="col-sm-10">

                <select className="form-control" id="sel1" value={course}
                  className="form-control"
                  onChange={(e) => setcourse(e.target.value)} >
                  <option>Select Appropriate Option</option>
                  <option>All Services</option>
                  <option>Assignment Help</option>
                  <option>Course Help</option>
                  <option>Live Sessions</option>
                  <option>Exam Prepration</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="pwd">Review: </label>
              <div className="col-sm-10">
                <textarea
                  value={review}
                  className="form-control"
                  onChange={(e) => setReview(e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </div>

            {/* temprary  */}
            <div className="form-group">
              <label className="control-label col-sm-2" for="rating">Rate us: </label>
              <div className="star__rating">
                <label>
                  <input type="radio" name="stars" value="One Star" onChange={changeRating} />
                  <span className="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="Two Star" onChange={changeRating} />
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="Three Star" onChange={changeRating} />
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="Four Star" onChange={changeRating} />
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                </label>
                <label>
                  <input type="radio" name="stars" value="Five Star" onChange={changeRating} />
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                  <span className="icon">★</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default">Submit</button>
              </div>
            </div>
          </form>

        )}


        {leaveReview === false && (
          <div className="reviews__content row">
            <div className="reviews__fliter col-sm-3">
              <div className="reviews__filter__one">
                <h4 className="text-primary"><strong>Browse by</strong></h4>
                <div className="list-group">
                <Link to="#" onClick={() => changeFilter('All Services')} className="list-group-item">All services</Link>
                  <Link to="#" onClick={() => changeFilter('Assignment Help')} className="list-group-item">Assignment help</Link>
                 
                  <Link to="#" onClick={() => changeFilter('Course Help')} className="list-group-item">Course help</Link>
                  <Link to="#" onClick={() => changeFilter('Live Sessions')} className="list-group-item">Live sessions</Link>
                  <Link to="#" onClick={() => changeFilter('Exam Prep')} className="list-group-item">Exam prep</Link>
                </div>
              </div>
              <div className="reviews__filter__two">
                <h4 className="text-primary"><strong>Filter by</strong></h4>
                <div className="list-group">
                  <Link to="#" onClick={() => changeFilter('Five Star')} className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></Link>
                  <Link to="#" onClick={() => changeFilter('Four Star')} className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></Link>
                  <Link to="#" onClick={() => changeFilter('Three Star')} className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></Link>
                  <Link to="#" onClick={() => changeFilter('Two Star')} className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></Link>
                  <Link to="#" onClick={() => changeFilter('One Star')} className="list-group-item"><i className="fa fa-star" aria-hidden="true"></i></Link>
                </div>
              </div>
            </div>

            {
              showFilter ? <ReviewFilter filtername={Filter} hideFilter={hideFilter} />
                :
                <div className="reviews__review__section col-sm-9">

                  <h3 className="text-primary"><strong>Recently added reviews</strong></h3>
                  {/* just repeated the code for better visual */}
                  <div className="row">
                    {Data && (
                      <>
                        {/* loop over the Data */}
                        {Data.map((i, index) => (
                          <div className="review col-sm-5" key={index}>
                            <div className="review__header">
                              <div className="review__header__img col-sm-3 col-xs-3">
                                <img className="img-circle img-responsive" src="data:image/png;base64,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" alt="profile image"></img>
                              </div>
                              <div className="reviewer__detail col-sm-9 col-xs-9">
                                <p><strong>{i.name}</strong></p>
                                <p>{i.university}</p>
                              </div>
                            </div>
                            <div className="review__content container-fluid">
                              <p className="text-justify"> {i.review}</p>
                            </div>
                          </div>
                        ))}

                      </>
                    )}

                  </div>







                </div>
            }
          </div>
        )}
      </div>
    </>
  )
}

export default Reviews
