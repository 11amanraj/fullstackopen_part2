const CountryDetail = ({country}) => {
    const languages = [];
      for (let key in country.languages) {
        languages.push(country.languages[key]);
      }
    
    return ( 
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
      </div>
     );
}
 
export default CountryDetail;