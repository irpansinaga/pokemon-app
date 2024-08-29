require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

console.log(`Your port is ${process.env.PORT}`);

app.use(cors());
app.use(express.json());

let caughtPokemon = [];

// Helper function to generate Fibonacci sequence
const fibonacci = (n) => {
  if (n <= 1) return n;
  let a = 0,
    b = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
};

const updatePokemonName = (pokemon) => {
  const fibValue = fibonacci(pokemon.renameCount);
  pokemon.renameCount += 1;
  const baseName = pokemon.name.split("-")[0];
  const newName = `${baseName}-${fibValue}`;
  pokemon.name = newName;

  return newName;
};

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon API");
});

// API to get the list of caught Pokemon
app.get("/api/my-pokemon", (req, res) => {
  res.json(caughtPokemon);
});

// API to catch a Pokemon
app.post("/api/catch", (req, res) => {
  const { name, imageUrl, nickname } = req.body;
  // Check if the nickname already exists
  const existingPokemon = caughtPokemon.find(
    (pokemon) => pokemon.nickname === nickname
  );

  if (existingPokemon) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Nickname already in use. Please choose a different nickname.",
      });
  }

  const success = Math.random() < 0.5;
  if (success) {
    caughtPokemon.push({ name, imageUrl, nickname: nickname, renameCount: 0 });
  }
  res.json({ success });
});

// API to release a Pokemon
app.post("/api/release", (req, res) => {
  const { nickname } = req.body;
  const index = caughtPokemon.findIndex(
    (pokemon) => pokemon.nickname === nickname
  );
  if (index > -1) {
    const num = Math.floor(Math.random() * 100) + 1;
    const isPrime = (n) => {
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return n > 1;
    };
    if (isPrime(num)) {
      caughtPokemon.splice(index, 1);
      res.json({ success: true, number: num });
    } else {
      res.json({
        success: false,
        message: "The random number is not a prime.",
        number: num,
      });
    }
  } else {
    res.status(404).json({ success: false, message: "Pokemon not found" });
  }
});

// API to rename a Pokemon
app.post("/api/rename", (req, res) => {
  const { nickname } = req.body;
  const pokemon = caughtPokemon.find(
    (pokemon) => pokemon.nickname === nickname
  );
  if (pokemon) {
    const updatedName = updatePokemonName(pokemon);
    res.json({ success: true, newName: updatedName });
  } else {
    res.status(404).json({ success: false, message: "Pokemon not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
