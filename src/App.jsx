import "./App.css";
import axios from "axios";

import HomePage from "./pages/HomePage";
import CountryDetailsPage from "./pages/CountryDetailsPage";
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const url = `https://ih-countries-api.herokuapp.com/countries`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);   

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage countries={countries} />} />
        <Route path="/country/:countryId" element={<CountryDetailsPage />} 
        />
      </Routes>
    </div>
  );
}

export default App;