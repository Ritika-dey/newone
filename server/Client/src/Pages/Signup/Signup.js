
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css'
import axios from 'axios';
import logo from './signup.svg'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
export default function Signup() {
  const history = useHistory();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [dob, setdob] = useState('')
  const [phone, setphone] = useState('')
  const [profession, setprofession] = useState('')
  const [specialization, setspecialization] = useState('')
  const [university, setuniversity] = useState('')
  const [password, setpassword] = useState('')
 
  const PostData = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !specialization || !profession || !password || !university || !dob||!phone) {

      window.alert("Please Enter All Fields..!!")

    } else {
      const articles = {
        name, email, university, profession, specialization, password, dob, phone
      }
      setname();
      setemail();
     
      setdob();
      setuniversity();
      setprofession();
      setspecialization();
      setphone();
      setpassword();
      axios.post("/signup", articles)
        .then(res => {
          console.log(res);
          if (res.data.message == "Saved Successfully") {
            window.alert("Signup Sucsessfull..!! Thankyou From Profese ")
            history.push("/login")
          } 
          else {
            window.alert("Something went wrong try again after some time.")
          }
        })
        .catch(err => {
          window.alert(err)
        })
    }
  }
  return (
    <div>
      <div className=' signup'>
        <div className='row'>
          <div className='col-sm-5 left '>

            <img src={logo} width="100%" className='img img-responsive' />


          </div>
          <div className='col-sm-7 right'>

            <form className='form '>
              <h2 className='title'>Get Started Here </h2>
              <label for="fname"> Name</label>
              <input type="text" value={name}
                onChange={(e) => setname(e.target.value)} placeholder="Your name.." />

              <label for="lname">Email</label>
              <input type="email" value={email}
                onChange={(e) => setemail(e.target.value)} placeholder="Your email.." />

              <label for="lname">Date Of Birth</label>
              <input type="date" value={dob}
                onChange={(e) => setdob(e.target.value)}
                placeholder="Enter your Date Of Birth" />
              {/* value={university}
                       onChange={(e)=>setuniversity(e.target.value)}
                       placeholder="Enter your university or college name"/> */}

              <label for="lname">University/College</label>
              <input type="text" value={university}
                onChange={(e) => setuniversity(e.target.value)}
                placeholder="Enter your university or college name" />
                 

              <label for="lname">Phone Number</label>
              {/* <input type="text" value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Enter your university or college name" /> */}
                 <PhoneInput className='ph'
                 classsName="inp"
      placeholder="Enter phone number"
      value={phone}
      onChange={setphone}/>

              <label for="country">Profession</label>
              <select id="country" name="country" value={profession} onChange={(e) => setprofession(e.target.value)} >
                <option value="NA">Select Profession</option>
                <option value="Tutor">Tutor</option>
                <option value="Student">Student</option>
              </select>

              <label for="lname">Specialization</label>
              <input type="text" value={specialization}
                onChange={(e) => setspecialization(e.target.value)}
                placeholder="Enter your specialization" />

              <label for="lname">Password</label>
              <input type="password" value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password" />

              <input type="submit" onClick={PostData} value="Submit" />
            </form>

          </div>
        </div>
      </div>
      <div className='container-fluid text'>
      </div>
    </div>
  )
}