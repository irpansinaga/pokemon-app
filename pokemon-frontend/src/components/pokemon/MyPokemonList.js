import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const MyPokemonList = () => {
  const [myPokemons, setMyPokemons] = useState([]);

  const fetchMyPokemonList = () => {
    axios
      .get(`${API_BASE_URL}/api/my-pokemon`)
      .then((res) => setMyPokemons(res.data))
      .catch((err) => console.error("Error fetching My Pokemon list:", err));
  };

  useEffect(() => {
    fetchMyPokemonList(); // Fetch when component mounts
  }, []);

  const releasePokemon = (nickname) => {
    axios
      .post(`${API_BASE_URL}/api/release`, { nickname })
      .then((response) => {
        if (response.data.success) {
          fetchMyPokemonList(); // Refresh list after release
        } else {
          alert("Failed to release the Pokemon: " + response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error releasing Pokemon:", err);
        alert(
          "An error occurred while trying to release the Pokemon. Please try again later."
        );
      });
  };

  const renamePokemon = (nickname) => {
    axios
      .post(`${API_BASE_URL}/api/rename`, { nickname })
      .then(() => fetchMyPokemonList()) // Refresh list after rename
      .catch((err) => console.error("Error renaming Pokemon:", err));
  };

  return (
    <div className="container pokemon-list">
      <h1>My Pokemon List</h1>
      <ul>
        {myPokemons.map((pokemon, index) => (
          <li key={index}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <p>nickname: {pokemon.nickname}</p>
            <div className="actions">
              <button onClick={() => renamePokemon(pokemon.nickname)}>
                Rename
              </button>
              <button onClick={() => releasePokemon(pokemon.nickname)}>
                Release
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPokemonList;
