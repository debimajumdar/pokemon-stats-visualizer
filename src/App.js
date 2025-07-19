import React, { useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [query, setQuery] = useState('');

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      setPokemon(null);
      alert("Pokémon not found!");
    }
  };

  const getTypeColor = (types) => {
    if (!types) return '#000';
    const primaryType = types[0].type.name;
    const typeColors = {
      fire: '#f08030',
      water: '#6890f0',
      grass: '#78c850',
      electric: '#f8d030',
      psychic: '#f85888',
      ice: '#98d8d8',
      dragon: '#7038f8',
      dark: '#705848',
      fairy: '#ee99ac',
      normal: '#a8a878',
      fighting: '#c03028',
      flying: '#a890f0',
      poison: '#a040a0',
      ground: '#e0c068',
      rock: '#b8a038',
      bug: '#a8b820',
      ghost: '#705898',
      steel: '#b8b8d0'
    };
    return typeColors[primaryType] || '#000';
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

      <div className="screen">
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
          <div className="placeholder">Loading...</div>
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
        <button className="arrow">↑</button>
        <button className="arrow">←</button>
        <button className="arrow">→</button>
        <button className="arrow">↓</button>
        <button className="cancel">X</button>
        <button className="confirm" onClick={fetchPokemon}>✓</button>
      </div>

      <input
        placeholder="Enter Pokémon Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default App;
