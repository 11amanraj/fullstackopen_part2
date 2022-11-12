const PersonForm = ({value,handler}) => {
    return ( 
        <form onSubmit={handler.submitHandler}>
            <div>
                name: <input value={value.newName} onChange={handler.nameInputHandler}/>
            </div>
            <div>
                number: <input value={value.newNumber} onChange={handler.numberInputHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
     );
}
 
export default PersonForm;