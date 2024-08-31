import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { AddDrive } from "./Services/DriveService";
import Drive from "./Models/Drive";
const NewRideEstimate = () => {

    const[estimatedTime,setEstimatedTime] = useState(new Date());
    const[estimatedPrice,setEstimatedPrice] = useState();
    const navigate = useNavigate();
    const location = useLocation();
   

    useEffect(() => {
        setEstimatedTime(calculateEstimatedTime());
        setEstimatedPrice(Math.round(Math.random() * (1000 -500) + 500));
    }, []);

    const calculateEstimatedTime = () => {
        const random = Math.round(Math.random() * (120 - 40) + 40);
        const date = new Date();
        return new Date(date.setSeconds(date.getSeconds() + random));
    }

    const handleSubmit = (e) =>
        {
            console.log(estimatedTime);
            e.preventDefault();
            const drive = new Drive(localStorage.getItem('userId'),location.state.startDestination,location.state.endDestination,estimatedPrice,estimatedTime);
            console.log(drive)

            AddDrive(drive)
            .then(function(response) {
                navigate("/countdown",{state:{driveId:response.data.id}});
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
            

        }
    return ( 
        <div className="create">
        <br />
        <form onSubmit={handleSubmit} >
            <div>
                <h2>Estimated time unitl the driver picks you up:</h2>
                <input 
                    type="text" 
                    required
                    readOnly
                    value = {estimatedTime.getMinutes() - new Date().getMinutes()  + ' minutes'}
                />
            </div>
            <div>
                <h2>Estimated Price:</h2>
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
