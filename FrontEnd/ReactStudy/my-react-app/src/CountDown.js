import Countdown,{ zeroPad } from 'react-countdown';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConditionalPopup from './ConditionalPopup';
import { GetEstimatedTime } from './Services/DriveService';
import { FinishDrive } from './Services/DriveService';


const CountDown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const userRole = localStorage.getItem('role')
  const[time, setTime] = useState('');
  const[status,setStatus] = useState();

    useEffect(() => {
       setIsPopupOpen(true)
       GetEstimatedTime(location.state.driveId)
            .then(function(response) {
              setTime(new Date(response.data.time));
              setStatus(response.data.driveState)
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log(location.state.acceptedClick)
    }, []);

    //useEffect(() => {
    //  if(status === 'In_Progress')
    //    window.location.reload();
    //});
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
            
          </ConditionalPopup>
        </>
     );
}
 
export default CountDown;