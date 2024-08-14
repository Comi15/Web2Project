import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NewRideEstimate = () => {

    const[estimatedTime,setEstimatedTime] = useState();
    const[estimatedPrice,setEstimatedPrice] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setEstimatedTime(Math.round(Math.random() * (5-1) + 1));
        setEstimatedPrice(Math.round(Math.random() * (1000 -500) + 500));
    }, []);

    const handleSubmit = (e) =>
        {
            e.preventDefault();
            navigate("/countdown");

        }
    return ( 
        <div className="create">
        <br />
        <form onSubmit={handleSubmit} >
            <div>
                <h2>Estimated time unitl the driver picks you up :</h2>
                <input 
                    type="text" 
                    required
                    readOnly
                    value = {estimatedTime + ' minutes'}
                />
            </div>
            <div>
                <h2>Estimated Price :</h2>
                <input type="text"
                    required
                    readOnly
                    value = {estimatedPrice + ' dinars'} 
                ></input>
            </div>
            <button>Confirm</button>
        </form>

    </div>
     );
}
 
export default NewRideEstimate
