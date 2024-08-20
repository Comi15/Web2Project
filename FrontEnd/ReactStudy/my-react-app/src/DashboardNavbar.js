import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from './Context/AuthProvider';




const DashboardNavbar = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [role,setRole] = useState("");
    const[count,setCount] = useState('false');

    useEffect(() => {
      setRole(localStorage.getItem('role'))
      setCount(localStorage.getItem('count'))
    });
    

    console.log(count)
    const handleClick = (e) => 
    {       
        localStorage.clear()
        setAuth({});
    }      
    return (
        <div className="nav-bar">        
            <nav className="navbar">
                <h1>Enjoy the ride</h1>
                <div className="links">
                    {(count === 'false' || count === null && (role=== 'user' || role === 'driver') ) &&< Link to="/pastdrives">My Past Drives</Link>} 
                    {role ==='admin' && <Link to="/alldrives">All Drives</Link>}  
                    {role ==='driver' && (count === 'false' || count === null) && <Link to="/newdrives">New Drives</Link>}   
                    {(role === 'user'&& (count === 'false' || count === null)) && <Link to = "/newdrive">New Drive</Link>}
                    {role ==='admin' && <Link to="/verification">Verification</Link>}
                    { (count === 'false' || count === null) &&< Link to="/profile">Profile</Link>}
                    {<Link to="/" onClick={handleClick}>Log out</Link>}
                                        

                </div>
            </nav>
        </div>
    
    );
}
 
export default DashboardNavbar ;