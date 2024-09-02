import Countdown,{ zeroPad } from 'react-countdown';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConditionalPopup from './ConditionalPopup';
import { GetEstimatedTime } from './Services/DriveService';
import { FinishDrive } from './Services/DriveService';
import {HubConnectionBuilder,LogLevel} from '@microsoft/signalr';
import Chat from './Chat';



const CountDown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const userRole = localStorage.getItem('role')
  const userName = localStorage.getItem('username')
  const[time, setTime] = useState('');
  const[status,setStatus] = useState();
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

    useEffect(() => {
       setIsPopupOpen(true)
        joinRoom(localStorage.getItem('username'),String(location.state.driveId),userRole)      
          
    }, []);

    useEffect(() => {
      GetEstimatedTime(location.state.driveId)
            .then(function(response) {
              setTime(new Date(response.data.time));
              setStatus(response.data.driveState)
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log(location.state.acceptedClick)
    });
    
    useEffect(() => {
      localStorage.setItem('count',isPopupOpen) 
    },[]);

    const renderer = ({hours,minutes, seconds }) => (
        <span>
          <h2> 
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </h2>
       </span>
      );

    const closePopup = () => 
    {
      setIsPopupOpen(false)
        localStorage.setItem('count','false')
        if(userRole === 'user')
        {
          navigate('/newdrive/estimate/rate',{state:{driveId:location.state.driveId}})    
        }
  
        else
        {
          navigate('/dashboard')
        }
    };
    
    const handleComplete = (e) => 
    {
      FinishDrive(location.state.driveId)
      .then(function(response) {
        
      })
      .catch(function (error) {
          console.log(error);
      });
      closePopup()
     

    }
    
    
    const joinRoom = async (user, room,role) => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
          .configureLogging(LogLevel.Information)
          .build();
  
        connection.on("ReceiveMessage", (user, message) => {
          setMessages(messages => [...messages, { user, message }]);
          console.log('message received : ', message);
        });
  
  
        await connection.start();
        await connection.invoke("JoinRoom", { user, room, role});
        setConnection(connection);
      } catch (e) {
        console.log(e);
      }
    }


    const sendMessage = async (message) => {
      try {
        await connection.invoke("SendMessage", message);
      } catch (e) {
        console.log(e);
      }
    }
  
    


    return ( 
        <>
          <ConditionalPopup isOpen={isPopupOpen} onClose={closePopup} canClose={canClose}>
            {status === 'No_Driver'?<h2>Time unitl the driver picks you up: </h2>:<h2>Time unitl the drive is done: </h2>}
            {console.log(time)}
            { time && 
              <Countdown
              onComplete={handleComplete}
              date= {time}
              renderer={renderer}
              >
              </Countdown>
            }
            <Chat messages ={messages} sendMessage = {sendMessage} username = {userName} />
                        
          </ConditionalPopup>
          
        </>
     );
}
 
export default CountDown;