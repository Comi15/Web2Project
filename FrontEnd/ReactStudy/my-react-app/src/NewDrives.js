import DrivesList from "./DrivesList";
import { GetDrives,DoAcceptDrive } from "./Services/DriveService";
import { GetUserById } from "./UserService";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const NewDrives = () => {
    const [newDrives,setNewDrives] = useState([])
    const {user,verified,blocked} = GetUserById(localStorage.getItem('userId'))
    const[acceptClicked,setAcceptClicked] = useState(false);
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    useEffect(() => 
        {
            if(acceptClicked === true)
                setAcceptClicked(false)
             GetDrives()
             .then(function (response) {
                setNewDrives(response.data.filter(drive => drive.status === 'No_Driver'));
                
            })
            .catch(function (error) {
                console.log(error);
            });
             
            
        },[acceptClicked]);

        const calculateEstimatedTime = () => {
            const random = Math.round(Math.random() * (120 - 40) + 40);;
            const date = new Date();
            return new Date(date.setSeconds(date.getSeconds() + random));
        }

        const handleAccept = (id) => {
                setAcceptClicked(true)
                let driverId = localStorage.getItem('userId');
                const untilEndOfDrive = calculateEstimatedTime();
                const sendObject = {driverId, untilEndOfDrive}
                DoAcceptDrive(id,sendObject)
                .then(function (response) {
                   navigate('/countdown', {state: {driveId:id,acceptedClick:acceptClicked}})
                   
               })
               .catch(function (error) {
                   console.log(error);
               });
            
        }

        
        
    return ( <div>
                {(verified === "Verified" && blocked === false) && <DrivesList newDrives={newDrives} role = {role} handleAccept={handleAccept}/>}
                {verified !== "Verified" && <h2>Your account has not been verified yet. <br />Please check you <Link to="/profile">Profile</Link> to see your account status</h2>}
                {blocked === true && <h2>The administrator has blocked your acccount</h2>}

            </div> 
    );
}
 
export default NewDrives;