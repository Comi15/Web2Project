import {Link} from 'react-router-dom'
import { useState } from 'react';

const Navbar = () => {

    const [b,setB] = useState(false)
    return (
    <div className="nav-bar">        
        <nav className="navbar">
            <h1>Enjoy the ride</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to = "/register">Sign up</Link>
                <Link to = "/login">Sign in</Link>
               
            </div>
        </nav>
    </div>
    );
}
 
export default Navbar;