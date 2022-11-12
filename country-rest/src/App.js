import { useEffect, useState } from 'react';
import axios from 'axios';

import CountryList from './Components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const inputHandler = e => {
    setFilter(e.target.value.toLowerCase());
  }

  return (
    <div>
      <p>find countries <input onChange={inputHandler}/></p>
      <CountryList countries={countries.filter(country => 
                          country.name.common.toLowerCase()
                          .includes(filter))}/>
    </div>
  );
}

export default App;
