import React from 'react'
import './dashboard.css'
import {Link} from 'react-router-dom'
export default function Tutordashboard() {
    return (
        <div>  
         <div className="container-fluid content">
             <div className="row">
             <Link to="/admin"> <div className="col-lg-3 mm link1">
                 <p className="text">You can Add Blogs From Here</p>
                 <h3 className="text-1">Add Blogs</h3>


                 </div></Link>
                 <Link to="/Asignment"><div className="col-lg-3 mm link2">
                 <p className="text">You can view requested assignment help From Here</p>
                 <h3 className="text-1">Requested Assignment</h3>


                 </div></Link>
                 <Link to="/sessions"> <div className="col-lg-3 mm link3">
                 <p className="text">You can view requested live sessions From Here</p>
                 <h3 className="text-1">Requested Sessions</h3>

                 </div></Link>
                 <Link to="/coursehelp">  <div className="col-lg-3 mm link4">
                 <p className="text">You can view requested course help From Here</p>
                 <h3 className="text-1">Requested Help</h3>
                 </div></Link>
                 <Link to="/practiceexam"> <div className="col-lg-3 mm link5">
                 <p className="text">You can view requested pratcice exam request From Here</p>
                 <h3 className="text-1">Requested Exam </h3>

                 </div></Link>
                 <Link to="/query"> <div className="col-lg-3 mm link6">
                 <p className="text">You can view user queries From Here</p>
                 <h3 className="text-1">Queries</h3>
                 </div></Link>
                 <Link to="/addcarrers"> <div className="col-lg-3 mm link7">
                 <p className="text">You can add Carrers oportunity From Here</p>
                 <h3 className="text-1">Add Career</h3>
                 </div></Link>
                
                
             </div>
         </div>
        </div>
    )
}
