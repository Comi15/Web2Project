import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { GetDriverId,DoRateDriver } from "./Services/DriveService";
const Rate = () => {
    const[ratingNumber,setRatingNumber] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.driveId);
    const [driverId,setDriverId] = useState('')
    


    useEffect(() => 
        {
             GetDriverId(location.state.driveId)
             .then(function (response) {
                setDriverId(response.data)
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },[]);
    console.log(driverId)


   const handleSubmit = (e) => {
        e.preventDefault()
        let userId = driverId;
        const ratingDto = {ratingNumber,userId}


        DoRateDriver(driverId,ratingDto)
             .then(function (response) {
                navigate("/dashboard")
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (  
        <div className="create">
        <form onSubmit={handleSubmit} >
            <div>
                <h2>Please Rate your driver :</h2>
                
                <input
                    min={1}
                    max={5}
                    type= 'number' 
                    required
                    value = {ratingNumber}
                    onChange={(e) => (setRatingNumber(e.target.value))}
                />
            </div>
            <button>Rate</button>
        </form>

    </div>
    );
}
 
export default Rate;