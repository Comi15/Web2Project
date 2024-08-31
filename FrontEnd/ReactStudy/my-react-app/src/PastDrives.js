import { useState,useEffect } from "react";
import { GetDrives } from "./Services/DriveService";
import DrivesList from "./DrivesList";
const PastDrives = () => {
    const [pastDrivesDriver,setPastDrivesDriver] = useState([]);
    const [pastDrivesUser,setPastDrivesUser] = useState([]);
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');

    useEffect(() => 
        {
           
             GetDrives()
             .then(function (response) {
                if (role === 'driver')
                {
                setPastDrivesDriver(response.data.filter(drive => drive.driverId === Number(id) && drive.status === 'Finished'));
                }
                if (role === 'user')
                {
                
                setPastDrivesUser(response.data.filter(drive => drive.userId === Number(id) && drive.status === 'Finished'));
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
        },[]);
        console.log(pastDrivesDriver)
        console.log(pastDrivesUser)
    return (
        <div>
           {role === 'driver'?<DrivesList newDrives={pastDrivesDriver} /> : <DrivesList newDrives={pastDrivesUser} />}
        </div>

     );
}
 
export default PastDrives;