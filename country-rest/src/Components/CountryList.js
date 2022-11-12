import CountryDetail from "./CountryDetail";
import SingleCountry from "./SingleCountry";

const CountryList = ({countries}) => {
    let countryList;

    if (countries.length === 0) {
        countryList = <p>no matches found</p>
    } else if (countries.length === 1) {
        countryList = <CountryDetail country={countries[0]}/>
    } else if ((countries.length > 1) && (countries.length < 11)) {
        countryList = countries.map(country => <SingleCountry key={country.name.common} country={country} />)
    } else {
        countryList = <p>Too many matches</p>
    }


    return (
        <div>
            {countryList}
        </div>
     );
}
 
export default CountryList;