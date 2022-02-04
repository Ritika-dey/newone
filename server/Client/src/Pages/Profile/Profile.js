import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Profile.css'
import UserAns from './UserAns'
import UserBasics from './UserBasics'
import UserEdu from './UserEdu'
import UserQues from './UserQues'
import axios from 'axios'
function Profile() {
  const [not, setnot] = useState(null)
  const [currentItemId, setcurrentItemId] = useState(null);
  const [ShowBasics, setShowBasics] = useState(false)
  const [ShowAns, setShowAns] = useState(false)
  const [ShowEdu, setShowEdu] = useState(false)
  const [ShowQues, setShowQues] = useState(false)
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const history = useHistory()
  const [userData, setUserData] = useState({});

  // update variables
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [dob, setdob] = useState("")
  const [phone, setphone] = useState("")
  const [specialization, setspecialization] = useState("")
  const [profession, setprofession] = useState("")
  const [university, setuniversity] = useState("")


  //  logic for fetching user from database
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

      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    callProfilepage();
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const res1 = await fetch("/getnot");
      const data1 = await res1.json();
      // store the data into our Data variable
      setnot(data1);
    }
  }, [])

  // get not

  const changeBasics = () => {
    setShowBasics(true)
    setShowAns(false)
    setShowEdu(false)
    setShowQues(false)
  }

  const changeEdu = () => {
    setShowBasics(false)
    setShowAns(false)
    setShowEdu(true)
    setShowQues(false)
  }

  const changeAns = () => {
    setShowBasics(false)
    setShowAns(true)
    setShowEdu(false)
    setShowQues(false)
  }

  const changeQues = () => {
    setShowBasics(false)
    setShowAns(false)
    setShowEdu(false)
    setShowQues(true)
  }
  const update = (currentItemId) => {
    console.log(currentItemId)
    const articles = {
      name, email, phone, dob, specialization, university, profession
    }
    setname("");
    setemail("");
    setuniversity("");
    setprofession("");
    setphone("");
    setspecialization("");
    setdob("");

    axios.put(`/updateuserdetails/${currentItemId}`, articles).then
      (
        res =>
          window.alert(` details updated`, res.data),

      )
      .catch(err => {
        console.log(err)
      })

  }
  return (
    <>
      <div className="profile__container container">

        {/* profile sidenav */}
        <div className="col-sm-4 profile__nav">
          <div className="profile__image" align="center">
            {/* profile image, get image src from backend */}
            <img className="img-responsive img-circle" src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="Profile image" />
            <h3><strong>{userData.name}</strong></h3>
          </div>
          <div className="profile__nav__list">
            {
              window.innerWidth < 650 ?
                <>
                  <button data-toggle="collapse" data-target="#myprofilefilter">
                    <i className='fa fa-filter'></i>
                  </button>
                  <div className="list-group collapse" id='myprofilefilter'>
                    <Link to="#" className="list-group-item" onClick={() => changeBasics()}>Basics</Link>
                    <Link to="#" className="list-group-item" onClick={() => changeEdu()}>Education</Link>
                    <Link to="#" className="list-group-item" onClick={() => changeAns()}>Answers</Link>
                    <Link to="#" className="list-group-item" onClick={() => changeQues()}>Questions</Link>
                    {/* change the below url for ask a question don't change above urls*/}
                    <Link to="/ask" className="list-group-item">Ask Questions</Link>
                  </div>
                </>
                :
                <div className="list-group">
                  <Link to="#" className="list-group-item" onClick={() => changeBasics()}>Basics</Link>
                  <Link to="#" className="list-group-item" onClick={() => changeEdu()}>Education</Link>
                  <Link to="#" className="list-group-item" onClick={() => changeAns()}>Answers</Link>
                  <Link to="#" className="list-group-item" onClick={() => changeQues()}>Questions</Link>
                  {/* change the below url for ask a question don't change above urls*/}
                  <Link to="/ask" className="list-group-item">Ask Questions</Link>
                </div>
            }
          </div>

        </div>
        {/* profile sidenav end */}

        {/* profile data */}
        <div className="col-sm-8 profile__data">
          <div className='profile__shortcut__buttons'>
            <button title='Edit profile' className="btn btn-info profile__shortcut__btn" data-toggle="modal" data-target="#profileModal" onClick={() => setcurrentItemId(`${userData._id}`)}><i className="fa fa-edit"></i></button>
            <button title='Cart' onClick={() => { history.push('/cart') }} className="btn btn-info profile__shortcut__btn"><i className='fa fa-shopping-cart'></i></button>
            <button title='Notifications' onClick={() => { history.push('/notification') }} className="btn btn-info profile__shortcut__btn"><i className='fa fa-bell'></i><span className='badge'>{not ? <>{not && not.length}</> : <>0</>}</span></button>
            <button title='My Purchases' onClick={() => { history.push('/purchases') }} className="btn btn-info profile__shortcut__btn"><i className='fa fa-list-alt'></i></button>
          </div>

          {/* <!-- Modal --> */}
          {/* modal content */}
          <div id="profileModal" className="modal fade" role="dialog">
            <div className="modal-dialog">

              {/* <!-- Modal content--> */}
              <div className="modal-content" style={{ backgroundColor: "#153280", color: "white" }}>
                <div className="modal-header" style={{ backgroundColor: "white", color: "#153280", fontWeight: "bold" }}>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Edit your profile details  {currentItemId}</h4>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      name="name"
                      className="form-control"
                      placeholder="Update your name here" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Update your email here" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Phone number:</label>
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      name="phone number"
                      className="form-control"
                      placeholder="Update your phone number here" required />
                  </div>


                  <div className="form-group">
                    <label htmlFor="dob">DOB:</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setdob(e.target.value)}
                      name="DOB"
                      className="form-control"
                      placeholder="Update your Date of birth here" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="course">profession:</label>
                    <input
                      value={profession}
                      onChange={(e) => setprofession(e.target.value)}
                      type="text"
                      name="course"
                      className="form-control"
                      placeholder="Update your profession here" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="major">speacialization:</label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setspecialization(e.target.value)}
                      name="major"
                      className="form-control"
                      placeholder="Update your major subject here" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="institution">Institution:</label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setuniversity(e.target.value)}
                      name="institution"
                      className="form-control"
                      placeholder="Update your institution here" required />
                  </div>


                  <button onClick={() => update(currentItemId)} className="btn btn-default">Update</button>
                </div>
              </div>
            </div>
          </div>


          {
            ShowBasics ? <UserBasics /> : (ShowEdu ? <UserEdu /> : (ShowAns ? <UserAns /> : ShowQues ? <UserQues /> : <UserBasics />))
          }
        </div>
        {/* profile data end */}
      </div>
    </>
  )
}

export default Profile
