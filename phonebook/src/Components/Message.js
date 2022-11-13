import './Message.css';

const Message = ({value}) => {
    let renderText;
    if (value.action === 'add') {
        renderText = <h3>Added {value.name}</h3>
    } else if (value.action === 'update') {
        renderText = <h3>Updated {value.name}</h3>
    } else if (value.action === 'delete') {
        renderText = <h3>Deleted {value.name}</h3>
    }

    return ( 
        <div className='message'>
            {renderText}
        </div>
     );
}
 
export default Message;