import { useEffect, useRef } from 'react';

const MessageContainer = ({ messages,username }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return <div ref={messageRef} className='message-container' >
        {messages.map((m, index) =>
            <div key={index} className='user-message'>
                {username === m.user?<div className='message'>{m.message}</div> : <div className='message2'>{m.message}</div>}
                {username !== m.user && <div className='from-user'>{m.user}</div>}
            </div>
        )}
    </div>
}

export default MessageContainer;
