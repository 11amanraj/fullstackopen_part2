import SinglePerson from "./SinglePerson";

const Persons = ({persons, filterText, deleteHandler}) => {
    return ( 
        <div>
            {persons.filter(person => 
                  person.name.toLowerCase().includes(filterText))
                        .map(person => 
                  <SinglePerson key={person.id} deleteHandler={deleteHandler} person={person}/>
            )}
        </div>
     );
}
 
export default Persons;