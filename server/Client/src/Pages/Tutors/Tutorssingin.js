
import React,{useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'

import logo from './p.png'
import { UserContext } from '../../App'; 
import './Login.css'

const Tutorsignin=()=> {
  const {state,dispatch} = useContext(UserContext);
const history=useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const loginuser=async(e)=>{
e.preventDefault();
const res=await fetch("/tutorsignin",{
  method:"POST",
  headers:{
      "Content-Type":"application/json"
  },
  body:JSON.stringify({
     email,password
  })
});
const data= res.json();
if(res.status===400|| !data){
  window.alert("invalid credentials");
  console.log("invalid data entered")
}
else{
  dispatch({type:'USER',payload:true})
  window.alert("login successfull")
history.push("/admin")
}
  }
  return (
    <div>
      <div className='container-fluid main '>
         <div className='row'>
           <div className='col-md-6 img '>
           <img src={logo} width="100%" height="100%" className='img-responsive'/>  
           </div>
           <div className='col-md-6 dv'>
           <form className='form'>
             <h2 className='title'>Login Here </h2>
  <div className="form-group signin ">
    <label for="email">Email address:</label>
    <input type="email" className="form-control" id="email" value={email}
                       onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div className="form-group ">
    <label for="pwd">Password:</label>
    <input type="password" className="form-control" id="pwd"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
  </div>
  <div className="checkbox">
    <label><input type="checkbox"/> Remember me</label>
  </div>
 <div className='row btns'>
 <button type="submit" className="btn btn-success btn-default col-sm-4 lg_bt" onClick={loginuser}>Login Now</button>
 
 </div>
</form>
           </div>
         </div>
      </div>
      
    </div>
       
       )
      }
      
      export default Tutorsignin