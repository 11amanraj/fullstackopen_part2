import { useEffect, useState } from 'react';
import contactServices from './services/contact';

import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import Message from './Components/Message';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText,setFilterText] = useState('');
  const [message, setMessage] = useState(null);

  const nameInputHandler = e => setNewName(e.target.value);
  const numberInputHandler = e => setNewNumber(e.target.value);
  const filterHandler = e => setFilterText(e.target.value.toLowerCase());
  
  const checkDuplicate = (obj) => {
    for(let i=0;i<persons.length;i++) {
      if(i === (persons.length-1)) {
        return (persons[i].name === obj.name) && i;
      } else {
        if (persons[i].name === obj.name) {
          return i;
        }
      }
    }
  }

  const submitHandler = e => {
    const postHandler = (newObj) => {
      contactServices.create(newObj)
        .then(contact => {
          setPersons(persons.concat(contact));
          setNewName('');
          setNewNumber('');
          setMessage({text: `Added ${newObj.name}`, type: 'success'})
          console.log(contact);
        })
        .catch(error => setMessage({text: error.response.data.error, type: 'error'}))
    }

    e.preventDefault();
    const newPerson = { name: newName, number: newNumber }

    if(!!checkDuplicate(newPerson)) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const index = checkDuplicate(newPerson);
        contactServices.update(persons[index].id,newPerson)
          .then(contact => {
            const newPersons = [...persons];
            newPersons[index] = contact;
            setPersons(newPersons);
            setNewName('');
            setNewNumber('');
            setMessage({text: `Updated ${newPerson.name}`, type: 'success'})
            contactServices.getAll()
              .then(contacts => setPersons(contacts));
          })
          .catch(error => {
            if (error.response.statusText === 'Bad Request') {
              setMessage({
                text: error.response.data.error, 
                type: 'error'
              })
              return
            }
            setMessage({
              text: `Information of ${newPerson.name} has already been removed from the server`, 
              type: 'error'
            })
          });
      }
    } else {
      postHandler(newPerson)
    }
  }

  const deleteHandler = (id,name) => {
    if (window.confirm(`Delete ${name}`)) {
      contactServices
        .deleteContact(id)
        .catch(error => setMessage({
          text: `Information of ${name} has already been removed from the server`, 
          type: 'error'}));
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
      setMessage({text: `Deleted ${name}`, type: 'success'})
    }
  }

  useEffect(() => {
    contactServices.getAll()
    .then(contacts => setPersons(contacts));
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      if(message !== null) {
        setMessage(null);
      }
    }, 5000)

    return () => clearTimeout(setTimeout(() => {
      if(message !== null) {
        setMessage(null);
      }
    }, 5000))
  }, [message])

  return (
    <div>
      <h2>Phonebook</h2>
      {(message !== null) && <Message message={message}/>}
      <Filter filterHandler={filterHandler}/>
      <h2>add a new</h2>
      <PersonForm value={{newName,newNumber}} handler={{nameInputHandler,numberInputHandler,submitHandler}} />
      <h2>Numbers</h2>
      <Persons persons={persons} deleteHandler={deleteHandler} filterText={filterText} />
    </div>
  )
}

export default App