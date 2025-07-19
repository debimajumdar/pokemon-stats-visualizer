import React, { useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [query, setQuery] = useState('');
  const [pokemonId, setPokemonId] = useState(null);

  const fetchPokemon = async (nameOrId = query) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toString().toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      setPokemon(data);
      setPokemonId(data.id);
    } catch (error) {
      alert("Pokémon not found!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchPokemon();
    }
  };

  const getImageClass = (name) => {
    if (!name) return '';
    if (name.toLowerCase() === 'pikachu') return 'sparkle';
    if (name.toLowerCase() === 'missingno') return 'glitch';
    return 'bounce';
  };

  return (
    <div className="pokedex">
      <div className="lens blue"></div>
      <div className="lens white"></div>
      <h2>Debi's Pokedex</h2>

      <div className="screen" style={{ backgroundColor: '#ffffff' }}>
        {pokemon ? (
          <img
            className={`pokemon-img ${getImageClass(pokemon.name)}`}
            src={
              pokemon.sprites.other['official-artwork'].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />
        ) : (
          <p style={{ color: 'black', fontSize: '16px' }}>Enter a Pokémon!</p>
        )}
      </div>

      <div className="description">
        {pokemon ? (
          <>
            <div className="name-row">
              <span>{pokemon.name.toUpperCase()}</span>
              <span>{pokemon.types.map(t => t.type.name).join(', ')}</span>
            </div>
            <div className="stats">
              <p>HP: {pokemon.stats[0].base_stat}</p>
              <p>Attack: {pokemon.stats[1].base_stat}</p>
              <p>Defense: {pokemon.stats[2].base_stat}</p>
              <p>Speed: {pokemon.stats[5].base_stat}</p>
            </div>
          </>
        ) : (
          <p>Put a description in here!</p>
        )}
      </div>

      <div className="buttons">
        <button className="arrow" onClick={() => pokemonId && fetchPokemon(pokemonId - 1)}>←</button>
        <button className="arrow" onClick={() => pokemonId && fetchPokemon(pokemonId + 1)}>→</button>
        <button className="cancel">X</button>
        <button className="confirm" onClick={() => fetchPokemon()}>✓</button>
      </div>

      <input
        placeholder="Enter Pokémon Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default App;
