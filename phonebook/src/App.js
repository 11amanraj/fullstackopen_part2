import { useState } from 'react'

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
                        number: newNumber
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
      <p>filter shown with <input onChange={filterHandler}/></p>
      <form onSubmit={submitHandler}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={nameInputHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberInputHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => 
                  person.name.toLowerCase().includes(filterText))
                .map(person => 
                  <p key={person.id}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )
}

export default App