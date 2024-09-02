import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const Chat = ({  messages,sendMessage,username }) => <div>
    <div className="chat-title">
        <h2>Chat</h2>
    </div>   
    <div className='chat'>
        <MessageContainer messages={messages} username={username} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;
