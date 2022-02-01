/* eslint-disable react/jsx-pascal-case */
import React, { createContext, useState, useReducer } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import NavOne from './components/NavOne/NavOne'
import Home from './components/Home/Home'
// import Signup from './Signup/Signup'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Signup/Login'
import Profile from './Pages/Profile/Profile'
import Discussion from './Pages/Discussion/Discussion'
import Logout from './Pages/Signup/Logout'


import { Ask } from './Pages/Discussion/Ask'

import { View } from './Pages/Discussion/View'
import Answer from './Pages/Answers/Answer'


// blog section
import Blog from './Pages/blog/Blog'
// import Addblog from './Pages/Admin/Addblog'
import Viewblog from './Pages/blog/Viewblog'
// support
import Support from './Pages/support/Support'
// services
import Assignment_help from './Pages/service/Assignment_help'
import One_on_one from './Pages/service/One_on_one'
import Practice_exam from './Pages/service/Practice_exam'
import Course_help from './Pages/service/Course_help'
// carrers
import Careers from './Pages/careers/Careers'
// reducer
import { initialState, reducer } from './Reducer/UseReducer'

import AskTutor from './Pages/Ask_a_tutor/AskTutor'
import Tutorsignin from './Pages/Tutors/Tutorssingin'

import Tutorsignup from './Pages/Tutors/Tutorsignup'
import Reviews from './Pages/reviews/Reviews'

import Edit from './Pages/Students/Edit'
import Edit1 from './Pages/Students/Edit1'
import Viewanswer from './Pages/Answers/Viewanswer'
// Admin

import Admin from './Pages/Admin/Admin'
import Practice from './Pages/Practice'
import Cart from './Pages/cart/Cart'
import Purchases from './Pages/purchases/Purchases'
import Notification from './Pages/notification/Notification'
import Read from './Pages/notification/Read'


export const UserContext = createContext();


const App = () => {

  // contect api


  const [width, setwidth] = useState(window.innerWidth)

  // for handling responsive navbar
  const handleWidth = () => {
    setwidth(window.innerWidth)
    // console.log(width)
  }
  window.addEventListener('resize', handleWidth)

  const [state, dispatch] = useReducer(reducer, initialState)


  return (

    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>

          <NavOne />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* routes for login signup logout */}
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            {/* routes for signup closes here */}
            {/* discussion block routes */}
            <Route path="/discussion">
              <Discussion />
            </Route>




            <Route path="/ask">
              <Ask />
            </Route>
            <Route path="/view/:id"
              render={props => <View {...props} />} />


            <Route path="/viewanswer/:id"
              render={props => <Viewanswer {...props} />}
            />



            {/* answers block */}
            <Route path="/answers">
              <Answer />
            </Route>




            {/* blog page */}
            <Route path="/blog">
              <Blog />
            </Route>

            {/* add blog page */}



            <Route path="/viewblog/:id"
              render={props => <Viewblog {...props} />} />

            {/* support */}
            <Route path="/support">
              <Support />
            </Route>

            {/* services */}
            <Route exact path="/assignment-help">
              <Assignment_help />
            </Route>
            <Route exact path="/live-sessions" >
              <One_on_one />
            </Route>
            <Route exact path="/course-help" >
              <Course_help />
            </Route>
            <Route exact path="/practice-exam" >
              <Practice_exam />
            </Route>
            {/* carrers */}
            <Route exact path="/careers">
              <Careers />
            </Route>
          </Switch>
          {/* admin panel */}

          <Route path="/ask-tutor">
            <AskTutor />
          </Route>
          <Route path="/signin">
            <Tutorsignin />
          </Route>
          <Route path="/tutorsignup">
            <Tutorsignup />
          </Route>

          {/* reviews */}
          <Route path="/reviews">
            <Reviews />

          </Route>



          <Route path="/edit/:id"
            render={props => <Edit {...props} />} />
          {/* students */}
          <Route path="/edit1/:id"
            render={props => <Edit1 {...props} />} />


          {/* admin routes */}
          <Route exact path="/admin">
            <Admin />
          </Route>
          {/* admi routes ends here */}

          {/* practice */}
          <Route exact path="/practice">
            <Practice />
          </Route>
          {/* student cart */}


          <Route exact path="/cart">
            <Cart />
          </Route>

          <Route exact path="/purchases">
            <Purchases />
          </Route>
          <Route exact path="/notification">
            <Notification />
          </Route>
          {/* solutions routes */}
          <Route path="/read/:id"
            render={props => <Read {...props} />} />
              
          {/* <Route exact path="/asignmentsol">
            <Asignmentsol/>
          </Route> */}

        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App