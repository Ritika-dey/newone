import React , {useState , useEffect} from 'react';
import axios from 'axios';
export default function Read(props) {
const[data , setdata]=useState('')
useEffect(() => {
    axios.get(`/viewnot/${props.match.params.id}`).then(res => [
      setdata(res.data)

    ])
      .catch(error => console.log(error));

  }, [props]);
  return <div>
 <div className='notification__container container'>
                <div className='notifcation__header'>
                    <h5><b>Notifications</b></h5> &nbsp;&nbsp;&nbsp;
                    <button title='Mark all as read' className="btn"><i className='fa fa-check'></i></button>
                </div>

                <hr style={{ borderTop: "2px solid black" }} />
               
                        
                            <div className='notification col-sm-11'  style={{ backgroundColor: "rgb(202, 225, 233)" }} >
                                <div className='notification__body col-xs-11'>
                                    <p className='notification__time'>{data.date}</p>
                                    <h5 className='notification__title'>{data.title}</h5>
                                    <h5 className='notification__title'>{data.body}</h5>
                                 
                                </div>
                            </div>
                      


            </div>
  </div>;
}
