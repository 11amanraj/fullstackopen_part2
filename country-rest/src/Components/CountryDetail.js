import { useEffect, useState } from "react";
import axios from "axios";

const CountryDetail = ({country}) => {
    const [weather, setWeather] = useState({temp: '', wind: ''});
    const [loading, setLoading] = useState(false);

    const languages = [];
    for (let key in country.languages) {
        languages.push(country.languages[key]);
    }

    useEffect(() => {
      const api_key = process.env.REACT_APP_API_KEY
      setLoading(true);

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`)
      .then(response => {
        setLoading(false);
        setWeather({
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: response.data.weather[0].icon
        })
      })
    }, [country.latlng])
    
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
            <h2>Weather in {country.capital[0]}</h2>
            {loading && <p>loading...</p>}
            {!loading && <div>
                            <p>temperature {weather.temp} Celsius</p>
                            {(weather.icon !== undefined) && 
                              <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.icon} />}
                            <p>wind {weather.wind} m/s</p>
                          </div>
            }
      </div>
     );
}
 
export default CountryDetail;