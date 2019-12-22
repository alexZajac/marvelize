import React, { useEffect, useState } from 'react';
import Particles from 'react-particles-js';

import { PARTICLES_PARAMS } from "./Constants";
import './App.css';

import Header from './Components/Header';
import Footer from "./Components/Footer";
import Characters from "./Components/Characters"

const App = () => {
  // state variables
  const [page, setPage] = useState(0);
  const [charactersData, setCharactersData] = useState([]);

  // side effects
  useEffect(() => {
    setCharactersData([]);
    fetch(`/api/characters/${page}`)
    .then(response => response.json())
    .then(characters => setCharactersData(characters.data))
    .catch(err => {
      console.log(err);
    })
  }, [page]);

  // render 
  return (
    <div className="app">
        <Particles className="particles" params={PARTICLES_PARAMS} />
        <Header /> 
        <Characters page={page} charactersData={charactersData} />
        <Footer page={page} setPage={setPage} />
    </div>
  );
}

export default App;
