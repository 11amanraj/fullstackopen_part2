import { useState } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText,setFilterText] = useState('');

  const nameInputHandler = e => {
    setNewName(e.target.value);
  }

  const numberInputHandler = e => {
    setNewNumber(e.target.value);
  }
  
  const checkDuplicate = (obj) => {
    for(let i=0;i<persons.length;i++) {
      if(i === (persons.length-1)) {
        return persons[i].name === obj.name;
      } else {
        if (persons[i].name === obj.name) {
          return true
        }
      }
    }
  }

  const submitHandler = e => {
    e.preventDefault();
    const newPerson = { 
                        name: newName,
                        number: newNumber,
                        id: newName
                      }
    checkDuplicate(newPerson) 
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))
    setNewName('');
    setNewNumber(''); 
  }

  const filterHandler = e => {
    setFilterText(e.target.value.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={filterHandler}/>
      <h2>add a new</h2>
      <PersonForm value={{newName,newNumber}} handler={{nameInputHandler,numberInputHandler,submitHandler}} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} />
    </div>
  )
}

export default App