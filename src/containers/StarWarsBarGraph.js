import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

function StarWarsBarGraph({planets}) {
  const [barAttributes, setBarAttributes] = useState('population')

  function parseData(planets) {
    const data = {
      labels: planets.map(planet => planet.name),
      datasets: [
        {
          label: barAttributes,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: planets.map(planet => planet[barAttributes])
        }
      ]
    }
    return data;
  }

  return (
    <div>
      <select value={barAttributes} onChange={e => setBarAttributes(e.target.value)}>
        <option value='population'>Population</option>
        <option value='rotation_period'>Rotation Period</option>
        <option value='orbital_period'>Orbital Period</option>
        <option value='diameter'>Diameter</option>
        <option value='surface_water'>Surface Water</option>
      </select>

      <Bar data={parseData(planets)}/>
    </div>
  )
}

export default StarWarsBarGraph;