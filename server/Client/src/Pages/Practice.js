import React,{useState} from 'react'

export default function Practice() {
    const [data , setdata]=useState("")
    const submit=(e)=>{
        e.preventDefault()
        if(data>=1 , data <=10){
          console.log(200)

        }else if(data>=10 , data <=20){
          console.log(400)
        }
        else if(data>=20 , data <=30){
          console.log(600)
        }
        else if(data>=30 , data <=40){
          console.log(800)
        }else if(data>=40 , data <=50){
          console.log(1000)
        }
    }
    return (
        <div>
           <div className="form-group">
  <label for="sel1">Select total no of questions:</label>
  <select className="form-control" id="sel1"value={data}  onChange={(e) => setdata(e.target.value)} >
    <option value="10">10-20</option>
    <option value="20">20-30</option>
    <option value="30">30-40</option>
    <option value="40">40-50</option>
    <option value="50">50-60</option>
  </select>
</div>
 <button onClick={submit}>submit</button>          
        </div>
    )
}
