import './Message.css';

const Message = ({message}) => {
    return ( 
        <h3 className={message.type}>
            {message.text}
        </h3>
     );
}
 
export default Message;