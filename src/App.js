import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Auth from './Hoc/auth';
import {toast} from 'react-toastify'

import NavBar from './Components/NavBar/NabBar'
import HomePage from './Components/HomePage/Homepage'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import LoginPage from './Components/LoginPage/LoginPage'
import AthletesPage from './Components/AthletesPage/AthletesPage'
import CoachesPage from './Components/CoachesPage/CoachesPage'



// Redux State
import {getAllAthletes} from './Redux/actions/athlete_actions'
import {getAllRequest} from './Redux/actions/pending_actions'
import {useDispatch, useSelector} from 'react-redux'

toast.configure()

function App(props) {
  // gettting all athletes
  const dispatch = useDispatch();

  dispatch(getAllAthletes()).then(res => {
    return
  })
  dispatch(getAllRequest()).then(res => {
    return
  })

  return (
    <div className="App">
      <NavBar />
      <div>
        <Switch>
          <Route exact path='/' component={Auth(HomePage, null)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/athletes' component={Auth(AthletesPage, null)} />
          <Route exact path='/coaches' component={Auth(CoachesPage, null)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
