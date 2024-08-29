import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./../../styles/pokemon.scss";

const PokemonDetail = ({ url, refreshMyPokemonList }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error(err));
  }, [url]);

  const catchPokemon = () => {
    if (!pokemon) return;

    const userNickname = prompt("Enter a nickname for your Pokemon:");
    if (!userNickname) {
      alert("Nickname is required to catch the Pokemon!");
      return;
    }

    axios
      .post("http://localhost:3001/api/catch", {
        name: pokemon.name,
        imageUrl: pokemon.sprites.front_default,
        nickname: userNickname,
      })
      .then((res) => {
        if (res.data.success) {
          refreshMyPokemonList(); // Fetch the latest list
        } else {
          alert("Failed to catch the Pokemon!");
        }
      })
      .catch((err) => {
        console.error("Error catching Pokemon:", err);
        alert("Failed to catch the Pokemon: " + err.response.data.message);
      });
  };

  return pokemon ? (
    <div className="container pokemon-detail">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Types: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p>
        Moves:{" "}
        {pokemon.moves
          .slice(0, 5)
          .map((m) => m.move.name)
          .join(", ")}
      </p>
      <button className="button" onClick={catchPokemon}>
        Catch
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PokemonDetail;
