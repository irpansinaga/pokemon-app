import React, { useState } from "react";
import PokemonList from "./components/pokemon/PokemonList";
import PokemonDetail from "./components/pokemon/PokemonDetail";
import MyPokemonList from "./components/pokemon/MyPokemonList";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const refreshMyPokemonList = () => {
    setUpdateTrigger((prev) => !prev);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        {!selectedPokemon ? (
          <PokemonList selectPokemon={setSelectedPokemon} />
        ) : (
          <PokemonDetail
            url={selectedPokemon}
            refreshMyPokemonList={refreshMyPokemonList}
          />
        )}
      </div>

      <div style={{ padding: "20px" }}>
        <MyPokemonList key={updateTrigger} />
      </div>
    </div>
  );
};

export default App;
