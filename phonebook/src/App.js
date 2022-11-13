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
  const [action, setAction] = useState({name: '', action: '', show: false});


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
      })
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
            setAction({...action, name: newPerson.name, action: 'update', show: true})
          });
      }
    } else {
      postHandler(newPerson);
      setAction({...action, name: newPerson.name, action: 'add', show: true});
    }
  }

  const deleteHandler = (id,name) => {
    if (window.confirm(`Delete ${name}`)) {
      contactServices.deleteContact(id)
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
      setAction({...action, name: name, action: 'delete', show: true});
    }
  }

  useEffect(() => {
    contactServices.getAll()
    .then(contacts => setPersons(contacts));
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      if(action.show) {
        setAction({...action, show: false})
      }
    }, 5000)

    return () => clearTimeout(setTimeout(() => {
      if(action.show) {
        setAction({...action, show: false})
      }
    }, 5000))
  }, [action])

  return (
    <div>
      <h2>Phonebook</h2>
      {action.show && <Message value={action}/>}
      <Filter filterHandler={filterHandler}/>
      <h2>add a new</h2>
      <PersonForm value={{newName,newNumber}} handler={{nameInputHandler,numberInputHandler,submitHandler}} />
      <h2>Numbers</h2>
      <Persons persons={persons} deleteHandler={deleteHandler} filterText={filterText} />
    </div>
  )
}

export default App