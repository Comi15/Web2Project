
import Navbar from './Navbar';
import Home from './Home';
import DashboardNavbar from './DashboardNavbar';
import { Route,Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import { useState,useEffect } from 'react';
import Unauthorized from './Unauthorized';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import { IsAuthenticated } from './UserService';
import useAuth from "./hooks/useAuth";
import CountDown from './CountDown';
import Verification from './Verification';
import NewRide from './NewRide';
import NewRideEstimate from './NewRideEstimate';
import Rate from './Rate';
import NewDrives from './NewDrives';
import AllDrives from './AllDrives';
import PastDrives from './PastDrives';
import { useLocation } from 'react-router-dom';
import WhileCounter from './WhileCounter';

function App() {

  const { auth } = useAuth();
  const[userId,setUserId] = useState(null)
  const[timerOn,setTimerOn] = useState(false);
  const location = useLocation();
  const[time, setTime] = useState('');

 

  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
    setTimerOn(localStorage.getItem('count'))   
  });
  
  return (
      
      <div on className="App">
       {
           userId ?<DashboardNavbar/> : <Navbar />
       }

        <div className="img">
          <img className="car-img"src="https://cdn-icons-png.flaticon.com/512/171/171239.png"/>
          <img className="car-img"src="https://cdn-icons-png.flaticon.com/512/171/171239.png"/>
          <img className="car-img"src="https://cdn-icons-png.flaticon.com/512/171/171239.png"/>
        </div>

        

        <div className="content">
         <Routes>
            <Route path="/" element ={<Home />}/>                                                           
            <Route path="/register" element = {<Register />}/>
            <Route path="/login" element = {<Login />}/>
            <Route path="/unauthorized" element = {<Unauthorized />}/>
            <Route path="/while-counter" element = {<WhileCounter />}/>
            <Route path="/dashboard" element = {<ProtectedRoute Component={Dashboard}/>}/>
            <Route path="/profile" element = {<ProtectedRoute Component={Profile} count ={timerOn} />}/>
            <Route path="/countdown" element ={<ProtectedRoute Component={CountDown} role='driveruser'/>}/>
            <Route path="/verification" element ={<ProtectedRoute Component={Verification} role='admin'/>}/>
            <Route path="/newdrive" element ={<ProtectedRoute Component={NewRide} role='user' count={timerOn}/>}/> 
            <Route path="/newdrive/estimate" element ={<ProtectedRoute Component={NewRideEstimate} role='user' count ={timerOn}/>}/>
            <Route path="/newdrive/estimate/rate" element ={<ProtectedRoute Component={Rate} role='user' />}/>
            <Route path="/newdrives" element ={<ProtectedRoute Component={NewDrives} role='driver' count ={timerOn} />}/>
            <Route path="/alldrives" element ={<ProtectedRoute Component={AllDrives} role='admin'/>}/>
            <Route path="/pastdrives" element ={<ProtectedRoute Component={PastDrives} role='driveruser' count ={timerOn} />}/>








            <Route path="*" element = {<NotFound />} />
          </Routes>  
        </div>
      </div>
  );
}

export default App;
