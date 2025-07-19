import React from 'react';

function EvolutionTree({ evolution }) {
  if (!evolution) return null;

  // Recursively build evolution paths
  const getPaths = (node, path = []) => {
    const current = [...path, node.species.name];
    if (node.evolves_to.length === 0) return [current];
    return node.evolves_to.flatMap((child) => getPaths(child, current));
  };

  const allPaths = getPaths(evolution);

  return (
    <div>
      <h2>Evolution Chain</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allPaths.map((path, idx) => (
          <li key={idx} style={{ fontSize: '18px' }}>
            {path.join(' → ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EvolutionTree;
