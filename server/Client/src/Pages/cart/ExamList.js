import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useHistory } from 'react-router-dom';

function ExamList() {
    const [item , setitem]=useState([])
    const [Data, setData] = useState([]);
    const history = useHistory()
    const [sdkReady, setSdkReady] = useState(false)
    const [pay, setpay] = useState({})

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        setpay(paymentResult)

    }

    const check = (_id) => {

        axios.put(`/payexam/${_id}`).then((res) =>
            window.alert(res.data),
            history.push('/purchases')
        )
    }


    // + adding the use
    useEffect(() => {
        getData();
        getData1();
        // we will use async/await to fetch this data
        async function getData() {
            const res = await fetch("/getex");
            const data = await res.json();

            // store the data into our Data variable
            setData(data);

        };
        async function getData1() {
            const res1 = await fetch("/getass");
            const data1 = await res1.json();

            // store the data into our Data variable
            setitem(data1);

        };
        // paypal
        const addpaypalScript = async () => {
            const { data: clientId } = await axios.get('/pay')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true


            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)

            if (!window.paypal) {
                addpaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, []);
    // logic end
    const deleted=async(_id)=>{
        await axios.delete(`/deletee/${_id}`).then(res=>window.alert(res.data))
    }
    return (
        <>
 <h3 style={{ color: "grey" }}><b>CART ITEMS <i className='fa fa-shopping-cart'></i> {item ?<>{item && item.length}</>:<>0</>}</b></h3>
            <table className="table table-responsive">

                <tbody>
                    {
                        Data.length == 0 ?
                            <div className='cart__empty' align="center">
                                <h3 style={{ color: "darkgray" }}><b>NOTHING IN CART</b></h3>
                                <img src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg" />
                            </div>
                            :
                            Data.map((i, index) =>
                                <>
  <tr key={index}>
                                         {i.payment==="Completed"?<></>:<>
                                        <td>{i.image}</td>
                                        <td>
                                            <div><span style={{ color: "grey" }}>Topic: </span>{i.title}</div>
                                            <div><span style={{ color: "grey" }}>Deadline: </span>{i.deadline}</div>
                                            <div><span style={{ color: "grey" }}>Requested On: </span>{i.date}</div>
                                            <div><span style={{ color: "grey" }}>Amount: </span><i className="fa fa-rupee"></i>{i.price}</div><br/>
                                            {i.payment==="Completed"?<>{i.status==="Completed"?<><p className='btn btn-success'>Pay Now</p></>:<></>}</>:<></>}
                                            <br />
                                           
                                            {i.status=="Pending" ?<> <button className='btn btn-danger' onClick={()=>deleted(`${i._id}`)}>Remove from Cart</button></>:<></>}
                                        </td>
                                        {i.payment == "Completed" ?
                                            <>{i.payment}</> :
                                            <><td>{i.status == "Completed" ?
                                                <>{pay.status ? <><h3 className='text-primary' onClick={() => check(`${i._id}`)}>Confirm Payment</h3></> :
                                                    <></>} </> :
                                                <>Payment Pending</>}
                                            </td>
                                                <td>{i.status == "Pending" ?
                                                    <> <button className='btn btn-danger'>Waiting For Approval</button></> :
                                                    <>
                                                        {sdkReady ? <h1>Loading</h1> : <>
                                                            
                                                            <PayPalButton amount={i.price}
                                                                onSuccess={successPaymentHandler} />

                                                        </>}
                                                    </>}</td>
                                            </>
                                        }
                                   
                                   </>}
                                    </tr>
                                </>
                            )
                    }
                </tbody>
            </table>
            {/* show this page when nothing in cart copy it to another sections also */}
            {/* <div className='cart__empty' align="center">
                <h3 style={{color:"darkgray"}}><b>NOTHING IN CART</b></h3>
                <img src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"/>
           </div> */}
        </>
    )
}

export default ExamList
