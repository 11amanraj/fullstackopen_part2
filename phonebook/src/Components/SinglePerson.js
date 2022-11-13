const SinglePerson = ({person, deleteHandler}) => {
    return ( 
        <p>{person.name} {person.number} <button onClick={() => deleteHandler(person.id,person.name)}>delete</button></p>
     );
}
 
export default SinglePerson;