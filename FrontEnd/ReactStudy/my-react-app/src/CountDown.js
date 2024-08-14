import Countdown,{ zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './Home';

const CountDown = () => {
    const[timer,setTimer] = useState();
    useEffect(() => {
        setTimer(Math.round(Math.random()*(120000 - 60000) + 60000));
    }, []);
    const navigate = useNavigate();

    const renderer = ({minutes, seconds }) => (
        <span>
          <h2> 
          {zeroPad(minutes)}:{zeroPad(seconds)}
          </h2>
        </span>
      );
    
    const handleComplete = (e) => {
            navigate('/')
            console.log(timer);
    }

    return ( 
     <div className='countdown-div'>
        <h2>Time unitl the driver picks you up : </h2>
        <br />  
        <Countdown  
        onComplete={handleComplete} 
        date={Date.now() + Math.round(Math.random()*(120000 - 60000) + 60000)}
        renderer={renderer}       
        >

        </Countdown>
    </div>
     );
}
 
export default CountDown;