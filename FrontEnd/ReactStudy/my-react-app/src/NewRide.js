import { useState } from "react";
import { useNavigate } from "react-router-dom";
const NewRide = () => {
    const[startDestination,setStartDestination] = useState();
    const[endDestination,setEndDestination] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/newdrive/estimate");
    }
    return ( 
        <div className="create">
        <form onSubmit={handleSubmit} >
            <div>
                <label>Start Destination :</label>
                <input 
                    type="text" 
                    required
                    value = {startDestination}
                    onChange={(e)=>setStartDestination(e.target.value)}
                />
            </div>
            <div>
                <label>End Destination :</label>
                <input type="text"
                    required
                    value = {endDestination}
                    onChange={(e)=>setEndDestination(e.target.value)} 
                ></input>
            </div>
            <button>Order</button>
        </form>

    </div>

     );
}
 
export default NewRide;
