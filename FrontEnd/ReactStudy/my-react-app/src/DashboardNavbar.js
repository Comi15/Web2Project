import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './Context/AuthProvider';




const DashboardNavbar = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [role,setRole] = useState("");

    useEffect(() => {
      setRole(localStorage.getItem('role'))  
    },);
    


    const handleClick = (e) => {
        localStorage.clear()
        setAuth({});

        
        
    }   
    return (  
        <div className="nav-bar">        
        <nav className="navbar">
            <h1>Enjoy the ride</h1>
            <div className="links">
                {role === 'user' && <Link to = "/newdrive">New Drive</Link>}
                {role ==='admin' && <Link to="/verification">Verification</Link>}
                <Link to="/profile">Profile</Link>
                <Link to="/" onClick={handleClick}>Log out</Link>                      

            </div>
        </nav>
    </div>
    );
}
 
export default DashboardNavbar ;