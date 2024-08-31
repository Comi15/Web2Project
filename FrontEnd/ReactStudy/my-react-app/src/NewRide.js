import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewRideEstimate from "./NewRideEstimate";
const NewRide = () => {
    const[startDestination,setStartDestination] = useState('');
    const[endDestination,setEndDestination] = useState('');
    const[clicked,setClickedButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setClickedButton(false)
    });

    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/newdrive/estimate',{state:{startDestination:startDestination,endDestination:endDestination}})
             
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
