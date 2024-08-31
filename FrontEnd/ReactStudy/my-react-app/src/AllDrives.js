import { GetDrives } from "./Services/DriveService";
import { useState,useEffect } from "react";
import DrivesList from "./DrivesList";
const AllDrives = () => {
    const [newDrives,setNewDrives] = useState([])
    useEffect(() => 
        {
           
             GetDrives()
             .then(function (response) {
                setNewDrives(response.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });
             
            
        }, []);

    return (  
        <div>
            <DrivesList newDrives={newDrives} />
        </div>
    );
}
 
export default AllDrives;