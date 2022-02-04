import React from 'react'
import './Student.css'
import {Link} from 'react-router-dom'
export default function Side() {
    return (
        <div>
             <div className="side">
            <Link to="/profile"><button type="button" className="btn btn-primary sidebtn">Your Profile</button></Link>
            </div>
            <div className="side">
               <Link to="/profile"><button type="button" className="btn btn-primary sidebtn">Your Asked Questions</button></Link>
            </div>
            <div className="side">
            <Link to="/profile"><button type="button" className="btn btn-primary sidebtn">Your Answered Questions</button></Link>
            </div>
           
            <div className="side">
            <Link to="/ask"><button type="button" className="btn btn-primary sidebtn">Ask Question</button></Link>
            </div>
        </div>
    )
}
