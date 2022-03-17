import { createContext } from "react";

const PokemonsContext = createContext({
    pokemons: [],
    setPokemons: () => {},
});

export default PokemonsContext;