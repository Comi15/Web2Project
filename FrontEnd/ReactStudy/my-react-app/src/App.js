
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

function App() {

  const { auth } = useAuth();
  const[userId,setUserId] = useState(null)
  
  useEffect(() => {
    setUserId(localStorage.getItem('userId'))
  });
  return (
      
      <div on className="App">
       {
           userId ? <DashboardNavbar /> : <Navbar />
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
            <Route path="/dashboard" element = {<ProtectedRoute Component={Dashboard}/>}/>
            <Route path="/profile" element = {<ProtectedRoute Component={Profile}/>}/>
            <Route path="/countdown" element ={<CountDown />}/>
            <Route path="/verification" element ={<ProtectedRoute Component={Verification} role='admin'/>}/>
            <Route path="/newdrive" element ={<ProtectedRoute Component={NewRide} role='user'/>}/> 
            <Route path="/newdrive/estimate" element ={<ProtectedRoute Component={NewRideEstimate} role='user'/>}/>                                                           




            <Route path="*" element = {<NotFound />} />
          </Routes>  
        </div>
      </div>
  );
}

export default App;
