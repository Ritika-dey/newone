import React, { useState , useEffect} from 'react'
import AssignmentList from './AssignmentList'
import CourseList from './CourseList'
import SessionList from './SessionList'
import ExamList from './ExamList'
import './Cart.css'
import {Link} from 'react-router-dom'

function Cart() {
    
    const [Assignment, setAssignmentList] = useState(false)
    const [Course, setCourseList] = useState(false)
    const [Session, setSessionList] = useState(false)
    const [Exam, setExamList] = useState(false)
    
    // get data
    useEffect(() => {
        
        // we will use async/await to fetch this data
        
    }, []);
    const showList = (str) =>{
        if(str === 'assignment help'){
            setAssignmentList(true)
            setCourseList(false)
            setExamList(false)
            setSessionList(false)
        }
        else if(str === 'course help'){
            setAssignmentList(false)
            setCourseList(true)
            setExamList(false)
            setSessionList(false)
        }
        else if(str === 'live sessions'){
            setAssignmentList(false)
            setCourseList(false)
            setExamList(false)
            setSessionList(true)
        }
        else{
            setAssignmentList(false)
            setCourseList(false)
            setExamList(true)
            setSessionList(false)
        }
    }
    return (
        <div className='container-fluid '>
            <div className='cart__header container-fluid'>
                
                <div className='row'>
                <h3 className='cart__header__pill btn btn-primary'>My Cart</h3>
                    <Link to="/purchases"><h3 className='cart__header__pill btn btn-primary'>My Purchases</h3></Link>
                    </div>
            </div>

            <div className='cart__items '>
                <div className='cart__item__contain'>
                    <div className='cart__item__header'>
                        <button className='btn btn1' onClick={() => showList('assignment help')}> Assignment Help </button>
                        <button className='btn btn2' onClick={() => showList('course help')}>Course Help</button>
                        <button className='btn btn3' onClick={() => showList('live sessions')}>Live Session</button>
                        <button className='btn btn4' onClick={() => showList('practice exam')}>Practice Exam </button>
                    </div>
                    
                    <hr style={{width:"100%"}}/>
                    <div className="cart__item__list">
                        {
                            Course ?
                                <CourseList />
                                :
                                Session ? 
                                    <SessionList />
                                    :
                                    Exam ?
                                        <ExamList />
                                        :
                                        <AssignmentList />
                        }
                    </div>

                </div>
            </div>

        
        </div>
    )
}

export default Cart
 