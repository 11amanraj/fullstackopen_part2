import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '555-55555'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
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
        {persons.map((person,i) => 
          <p key={i}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )
}

export default App