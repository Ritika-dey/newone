import React ,{useState}from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Signup.css';
import logo from './signup.png'
const Tutorsignup=()=> {
    const history=useHistory();
    const[user,SetUser]=useState({
        name:"",email:"",password:"",dob:"",phone:"",profession:"",specialization:""
    });
    let name ,value;
const handelInputs=(e)=>{
    console.log("welcome")
    name=e.target.name;
    value=e.target.value;
    SetUser({...user,[name]:value});
}
const PostData =async(e)=>{
e.preventDefault();
const { name , email , password , dob , phone , profession , specialization } =user;
const res=await fetch("/tutorsignup",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name , email , password , dob , phone , profession ,specialization
    })
});
const data=await res.json();
if(res.status===422||!data){
    window.alert("Invalid Credentials!!! Or email is already in use!!! use diffrent email")
    console.log("failed registration")
}else{
    window.alert("registration succesfull")
    console.log("registration done")
    history.push("/signin");
}

}
    return (
       
       <div id="portfolio" className="container one text-center bg-grey">
  <h2 className="center">Tutor Signup</h2>
  <h4 className="center">Only Tutor Can Signup From Here To Create Your Account</h4>
  <div className="row text-center slideanim">
    <div className="col-sm-6">
      <div className="thumbnail">
        <img src={logo} alt="Paris" width="100%" height="100%"/>
        <p><strong>Allready Have An Account</strong></p>
        <p><Link to="/signin" className="link">Login Now</Link></p>
      </div>
    </div>
    <div className="col-sm-6">
      <div className="thumbnail">
      
               <form method="POST" className="regsiteration-form form-inline" id="signup-form">
                   <div className="form-group">
                       
                       <input type="text" name="name" id="name" className="form-control frm1" 
                       autoComplete="off"
                       value={user.name}
                       onChange={handelInputs}
                       placeholder="Enter Your Name"/>
                   </div>
                   <div className="form-group">
                      
                       <input type="email" name="email" id="email" className="form-control frm1" 
                       autoComplete="off"
                       value={user.email}
                       onChange={handelInputs}
                       placeholder="Enter Your Email"/>
                   </div>
                
                   <div className="form-group">
                       
                       <input type="text" name="dob" id="dob" className="form-control frm1" 
                       autoComplete="off"
                       value={user.dob}
                       onChange={handelInputs}
                       placeholder="Enter your Date Of Birth"/>
                   </div>
                   <div className="form-group">
                       
                       <input type="text" name="phone" id="phone" className="form-control frm1" 
                       autoComplete="off"
                       value={user.phone}
                       onChange={handelInputs}
                       placeholder="Enter your Phone Number"/>
                   </div>
                   
                   <div className="form-group">
                      
                       <input type="password" name="password" id="password" className="form-control frm1" 
                       autoComplete="off"
                       value={user.password}
                       onChange={handelInputs}
                       placeholder="Create Password"/>
                   </div>
                   <div className="form-group">
                   
                      
                      <input type="text" name="specialization" id="specialization" className="form-control frm1" 
                      autoComplete="off"
                      value={user.specialization}
                      onChange={handelInputs}
                      placeholder="eg:Science , Math , English , computer etc"/>
                  </div>
                  <div className="form-group">
                   
                      
                   <input type="text" name="profession" id="profession" className="form-control frm1" 
                   autoComplete="off"
                   value={user.profession}
                   onChange={handelInputs}
                   placeholder="eg.lecturer etc"/>
               </div>
               <div className="form-group">
                   <button type="submit" value="submit" onClick={PostData} className="btn btn-primary btn-lg">Submit</button></div>
               </form>
      </div>
    </div>
  
  </div>
  </div>
      
 
        
    )
}

export default Tutorsignup
