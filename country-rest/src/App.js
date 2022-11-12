import { useEffect, useState } from 'react';
import axios from 'axios';

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

    let countryList;

    const filteredList = countries.filter(country => 
                          country.name.common.toLowerCase()
                          .includes(filter));

    if (filteredList.length === 0) {
      countryList = <p>no matches found</p>
    
    } else if (filteredList.length === 1) {
      const languages = [];
      for (let key in filteredList[0].languages) {
        languages.push(filteredList[0].languages[key]);
      }
      countryList = <div>
        <h2>{filteredList[0].name.common}</h2>
        <p>capital {filteredList[0].capital[0]}</p>
        <p>area {filteredList[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={filteredList[0].flags.png} alt={filteredList[0].name.common} />
      </div>
    
    } else if ((filteredList.length > 1) && (filteredList.length < 11)) {
      countryList = filteredList.map(country => <li key={country.name.common}>{country.name.common}</li>)
    
    } else {
      countryList = <p>Too many matches</p>
    }

  return (
    <div>
      <p>find countries <input onChange={inputHandler}/></p>
      {countryList};
    </div>
  );
}

export default App;
