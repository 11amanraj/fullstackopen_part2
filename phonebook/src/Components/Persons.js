import SinglePerson from "./SinglePerson";

const Persons = ({persons, filterText}) => {
    return ( 
        <div>
            {persons.filter(person => 
                  person.name.toLowerCase().includes(filterText))
                        .map(person => 
                  <SinglePerson key={person.id} person={person}/>
            )}
        </div>
     );
}
 
export default Persons;