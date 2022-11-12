import { useState } from "react";
import CountryDetail from "./CountryDetail";

const SingleCountry = ({country}) => {
    const [showDetail, setShowDetail] = useState(false);

    return ( 
        <>
            <p>
                {country.name.common}  
                <button onClick={() => setShowDetail(prev => !prev)}>
                    {showDetail ? 'hide' : 'show'}
                </button>
            </p>
            {showDetail && <CountryDetail country={country} />}
        </>
     );
}
 
export default SingleCountry;