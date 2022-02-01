import React,{useState,useEffect} from 'react'
import './Profile.css'

function UserEdu() {
    const[userData,setUserData]=useState({});
    //  logic for fetching user from database
 const callProfilepage =async()=>{
   try{
       const res=await fetch("/about",{
       method:"GET",
       headers:{
           Accept:"application/json",
           "Content-Type":"application/json"
       },
       credentials:"include"
   });
   const data=await  res.json();
   
   console.log(data);
   setUserData(data);
   if(!res.status===200){
       const error=new Error(res.error);
       throw error;
   }
   
   }catch(err){
   console.log(err)

  
   }
      }
      
       useEffect(() => {
           callProfilepage()
       })
 // ends here
    return (
        <>
           <div className="user__edu__container container-fluid">
                <h2 className="user__edu__title">Educational Information And Specialization</h2>
                <hr style={{border:"1px solid #153280"}}/>

                <div className="user__college user__details col-sm-6">
                    <h3><i className="fa fa-university" aria-hidden="true"></i> Profession </h3>
                    <h4>{userData.profession}</h4>
                </div>

                <div className="user__course user__details col-sm-6">
                    <h3><i className="fa fa-graduation-cap" aria-hidden="true"></i> Specialization </h3>
                    <h4>{userData.specialization}</h4>
                </div>

                <div className="user__major user__details col-sm-6">
                    <h3><i className="fa fa-book" aria-hidden="true"></i> User Id </h3>
                    <h4>{userData._id}</h4>
                </div>
                <div className="user__college user__details col-sm-6">
                    <h3><i className="fa fa-university" aria-hidden="true"></i> University / College </h3>
                    <h4>{userData.university}</h4>
                </div>
           </div>
        </>
    )
}

export default UserEdu
