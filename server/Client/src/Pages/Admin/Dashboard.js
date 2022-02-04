import React from 'react'
import Chart from 'react-google-charts'
import './Admin.css'
import Assignments from './Components/Assignments'
import Course from './Components/Course'
import Exam from './Components/Exam'
import Reviews from './Components/Reviews'
import Session from './Components/Session'
import Users from './Components/Users'

function Dashboard() {
    return (
        <>
            <div className="dashboard__container">
                <div className="dashboard__header ">
                    <h1>Hello Admin..!!</h1>
                    <p>Welcome to Profese admin dashboard</p>
                </div>

                <div className="dashboard__contents ">
                    {/* number of requests */}
                    <div className="dashboard__req">
                        <div className="col-sm-3 req__cards">
                          <Assignments/>
                        </div>
                        <div className="col-sm-3 req__cards">
                            <Course/>
                        </div>
                        <div className="col-sm-3 req__cards">
                           <Session/>
                        </div>
                        <div className="col-sm-3 req__cards">
                           <Exam/>
                        </div>
                    </div>


                    {/* charts */}
                    <div className="dashboard__charts">
                        <div className="dashboard__chart__newuser col-sm-6">
                            <Chart 
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                // update this data field and connect with backend
                                data={[
                                ['Date', 'New user count'],
                                ['1-12-21', 817],
                                ['2-12-21', 379],
                                ['3-12-21', 269],
                                ['4-12-21', 99],
                                ['5-12-21', 152],
                                ]}
                                options={{
                                title: 'New user Signup Data', 
                                hAxis: {
                                    title: 'Total New User',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'City',
                                },
                                }}
                                legendToggle
                            />
                        </div>
                        <div className="dashboard__chart__usertraffic col-sm-6">
                            <Chart 
                                chartType="AreaChart"
                                loader={<div>Loading Chart</div>}
                                // update this data field and connect with backend
                                data={[
                                ['Month', 'User Visited'],
                                ['Jan', 1000],
                                ['Feb', 1170],
                                ['March', 660],
                                ['April', 1030],
                                ['May', 340]
                                ]}
                                options={{
                                title: 'Website Traffic/User engagement',
                                hAxis: { title: 'Month' },
                                vAxis: { title: 'User visited', minValue: 0 } 
                                }}
                            />
                        </div>
                    </div>


                    {/* pending reviews and new cutomers */}
                    <div className="dashboard__lists container-fluid">
                        <div className="col-sm-7 pending__reviews">
                            <h3><b>Pending Reviews</b></h3> 
                            {/* loop over pending review div */}
                          <Reviews/>
 
                        </div>
                        <div className="col-sm-5 new__customers">
                            <h3><b>New Customers</b></h3>
                            {/* new customers components */}
                            <Users/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
 