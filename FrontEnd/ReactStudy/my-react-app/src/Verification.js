import { useState,useEffect,useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Block, GetUsers, VerifyDriverDecline } from "./UserService";
import DriversList from "./DriversList";
import { DoVerifyDriver,DoVerifyDriverDecline,DoBlock,DoUnBlock } from "./UserService";




const Verification = () => {
    const[users,setUsers] = useState([])
    const[clickedVerify,setClickedVerify] = useState(false)
    const[clickedVerifyDecline,setClickedVerifyDecline] = useState(false)
    const[clickedBlock,setClickedBlock] = useState(false)
    const[clickedUnblock,setClickedUnblock] = useState(false)
    



    const navigate = useNavigate();

    useEffect(() => {
        if(clickedVerify === true)
            setClickedVerify(false)
        if(clickedBlock === true)
            setClickedBlock(false)

        if(clickedUnblock === true)
            setClickedUnblock(false)
        if(clickedVerifyDecline === true)
            setClickedVerifyDecline(false)   
    });
   
    useEffect(() => 
    {
         GetUsers()
         .then(function (response) {
            setUsers(response.data)
            
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(users);
    },[clickedVerify,clickedVerifyDecline,clickedUnblock,clickedBlock]);

    const handleVerify = (email) => 
    {
            
            DoVerifyDriver(email)
            .then(function (response) {
                console.log('Did verify');
                setClickedVerify(true);
                
            })
            .catch(function (error) {
                console.log(error);
            });

            
            navigate('/verification')
    }

    const handleVerifyDecline = (email) => 
    {
            
        DoVerifyDriverDecline(email)
        .then(function (response) {
            console.log('Did verify decline');
            setClickedVerifyDecline(true);
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
       
        
        navigate('/verification')
        
    }

    const handleBlock = (email) => {
        console.log(email);
        DoBlock(email)
        .then(function (response) {
            console.log('Did block');
            setClickedBlock(true);
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
       
        navigate('/verification')
    }

    const handleUnBlock = (email) => {
        console.log(email)
        DoUnBlock(email)
        .then(function (response) {
            console.log('Did Unblock');
            setClickedUnblock(true);
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
        
        navigate('/verification')
    }

    

    return (  
        <DriversList users={users} handleVerify={handleVerify} handleVerifyDecline={handleVerifyDecline} handleBlock={handleBlock} handleUnBlock={handleUnBlock} />
    );
}
 
export default Verification
