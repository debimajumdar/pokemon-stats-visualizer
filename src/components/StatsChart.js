import React from 'react';

function StatsChart({ stats }) {
  if (!stats) return null;

  return (
    <div>
      <h2>Base Stats</h2>
      <ul>
        {stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatsChart;
