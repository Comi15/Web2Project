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
        if(clickedVerify)
            setClickedVerify(false)
        if(clickedBlock)
            setClickedBlock(false)

        if(clickedUnblock)
            setClickedUnblock(false)
        if(clickedVerifyDecline)
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
                
                
            })
            .catch(function (error) {
                console.log(error);
            });

            setClickedVerify(true);
            navigate('/verification')
    }

    const handleVerifyDecline = (email) => 
    {
            
        DoVerifyDriverDecline(email)
        .then(function (response) {
            console.log('Did verify decline');
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
       
        setClickedVerifyDecline(true);
        navigate('/verification')
        
    }

    const handleBlock = (email) => {
        console.log(email);
        DoBlock(email)
        .then(function (response) {
            console.log('Did block');
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
        setClickedBlock(true);
        navigate('/verification')
    }

    const handleUnBlock = (email) => {
        console.log(email)
        DoUnBlock(email)
        .then(function (response) {
            console.log('Did Unblock');
            
            
        })
        .catch(function (error) {
            console.log(error);
        });
        setClickedUnblock(true);
        navigate('/verification')
    }

    //const drivers = users.filter(user => user.role === 'driver');
    //drivers.sort((a,b)=> (a.id < b.id) ? 1 : -1)

    return (  
        <DriversList users={users} handleVerify={handleVerify} handleVerifyDecline={handleVerifyDecline} handleBlock={handleBlock} handleUnBlock={handleUnBlock} />
    );
}
 
export default Verification
