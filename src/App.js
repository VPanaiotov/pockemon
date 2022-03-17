import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Pokemons from './pages/Pokemons/Pokemons';
import Pokemon from './pages/Pokemon/Pokemon';
import PokemonsContext from './providers/PokemonsContext';
import { pokemonsURL } from './providers/constants';

function App() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch(pokemonsURL+'?limit=100&offset=200').then((r) => 
    r.json()).then((res) => {
      setPokemons(res.results);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <PokemonsContext.Provider value={{ pokemons, setPokemons }}>
          <Switch>
            <Redirect from="/" exact to="/pokemons" />
            <Route exact path="/pokemons" component={Pokemons} />
            <Route path="/pokemons/:id" component={Pokemon} />
            <Route path="*" component={NotFound} />
          </Switch>
        </PokemonsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
