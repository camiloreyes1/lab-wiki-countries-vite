import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
export default function CountryDetailsPage(props) {


    const [data, setData] = useState();
    const [borders, setBorders] = useState([]);
    const [borderCountries, setBorderCountries] = useState([]);
    const { countryId } = useParams();
    const fetchData = async () => {
    
        try {
            const response = await axios.get(
                `https://ih-countries-api.herokuapp.com/countries/${countryId}`
            );
            setData(response.data);
            setBorders(response.data.borders);
            //   console.log("Borders:", data.borders);
            console.log("borders", borders);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchBorderCountries = async () => {
        try {
          const borderCountriesData = await Promise.all(
            borders.map((border) =>
              axios.get(`https://ih-countries-api.herokuapp.com/countries/${border}`)
            )
          );
          setBorderCountries(borderCountriesData.map((response) => response.data));
        } catch (error) {
          console.error("Error fetching border countries:", error);
        }
    };
        
        useEffect(() => {
            fetchData();
        }, [countryId]);
        console.log("data:", data);


        useEffect(() =>{
            if (borders.length > 0) {
                fetchBorderCountries();
            }
        })




    return (
        <div className="container">
            {data ? (
                <>
        <h1>{data.name.common}</h1>
            <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${data.alpha2Code.toLowerCase()}.png`}
            alt=""
            style={{ width: "30px", marginRight: "10px" }}
            />
                    <br></br>
                    <br></br>

        <table className="table">
            <tbody>
                <tr>
                    <td>Capital: </td>
                    <td>{data.capital}</td>

                <tr>
                    <td>Area: </td>
                    <td>{data.area}km <sup>2</sup></td>

                    <br></br>
                    <br></br>
        </tr>

        <tr>
        <td>Borders</td>
        <ul>
             {borderCountries.length > 0 ? (
            <ul>
                {borderCountries.map((country) => (
                <li key={country._id}>
                    <Link to={`/country/${country.alpha3Code}`}>{country.name.common}</Link>
                </li>
                ))}
            </ul>
            ) : (
            <p>No bordering countries.</p>
            )}
        </ul>
        </tr>
        </tr>
        </tbody>
        </table>
        </>
                ) : (
                <p>loading </p>
                )}
                </div>
    );
}