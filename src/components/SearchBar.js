import React from 'react';

function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value.toLowerCase());
  };

  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      onChange={handleChange}
      style={{
        padding: '10px',
        fontSize: '18px',
        width: '100%',
        maxWidth: '400px',
        margin: '20px auto',
        display: 'block',
        borderRadius: '6px',
        border: '1px solid #ccc'
      }}
    />
  );
}

export default SearchBar;
