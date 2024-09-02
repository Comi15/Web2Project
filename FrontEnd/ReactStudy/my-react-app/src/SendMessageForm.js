import { useState } from 'react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
   const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
        let audio = new Audio("/popUp.mp3")
        audio.play();
    }

    return (
        
        <form>
            <div className="send-message">
            <textarea rows="0" cols="17"
                      placeholder="  Enter a message..." onChange={e => setMessage(e.target.value)} value={message} />         
                <button className="verify-button" disabled={!message} onClick={handleSubmit}>Send</button>
            </div>
        </form>
    
    )
}

export default SendMessageForm;
