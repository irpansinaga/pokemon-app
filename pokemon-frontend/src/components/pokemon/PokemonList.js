import React, { useEffect, useState } from "react";
import axios from "axios";
// import styles from "./../../styles/pokemon.scss";

const PokemonList = ({ selectPokemon }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container pokemon-list">
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index} onClick={() => selectPokemon(pokemon.url)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
