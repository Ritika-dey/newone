import React, { useState} from 'react'
import axios from 'axios'

// import "./Discussion.css"


function AddCareer() {
    const [type, Settype] = useState("")
    const [body,SetBody]=useState("")
    const [location, Setlocation] = useState("")
    const [name, SetName] = useState("")
    const [ experience, Setexperience] = useState("")
   
   
    
    const changeOnClick = e =>{
       
        const articles={
            name,
            location,
            type,
            experience,
            body,
        }
        SetName("");
        Setexperience("");
        Setlocation("");
        Settype("");
        SetBody("");
        axios.post("/carrer",articles).then
        (
            res=>
            window.alert(res.data),
           
            )
        .catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <>
           <div className="add__career ">
               <h2>Add Career</h2>
               <div className="add__career__form">
               <form onSubmit={changeOnClick} encType="multipart/form-data" >
                        <div className="form-group"> 
                            <input 
                            name={name }  onChange={(e) => SetName(e.target.value)} 
                                className="form-control" 
                                type="text" 
                                name="job_title" 
                                placeholder="Enter Job title here. e.g: Developer, tester, DB administrator"/>
                        </div>
                        <div className="form-group"> 
                            <input 
                            name={location} onChange={(e) => Setlocation(e.target.value)}
                                className="form-control" 
                                type="text" 
                                name="location" 
                                placeholder="Enter Job location here."/>
                        </div>
                        <div className="form-group"> 
                            <input 
                            name={ experience} onChange={(e) => Setexperience(e.target.value)} 
                                className="form-control" 
                                type="text" 
                                name="experience" 
                                placeholder="Enter required experience."/>
                        </div>
                        <div className="form-group"> 
                            <input 
                             name={type} onChange={(e) => Settype(e.target.value)} 
                                className="form-control" 
                                type="text" 
                                name="type" 
                                placeholder="Enter job type here. e.g: Fulltime, parttime, internship."/>
                        </div>
                        <div className="form-group"> 
                            <textarea
                            name={body} onChange={(e) => SetBody(e.target.value)} 
                                className="form-control" 
                                type="text" 
                                name="Desc" 
                                rows="4"
                                placeholder="Enter Job description here.">
                            </textarea>
                        </div>

                        <input type="submit" value="Add" className="btn btn-primary"/>
                    </form>
               </div>
           </div>
        </>
    )
}

export default AddCareer
 