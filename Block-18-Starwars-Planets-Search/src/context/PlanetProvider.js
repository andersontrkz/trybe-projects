import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PlanetContext from './PlanetContext';
import fetchPlanets from '../services/planetsAPI';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [tableTitles, setTableTitles] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filter, setFilter] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: '0',
        },
      ],
    },
  );

  // Guarda todos os planetas
  async function getPlanets() {
    const planetsArray = await fetchPlanets();
    setFilteredPlanets(planetsArray);
    setPlanets(planetsArray);
  }

  // Guarda o nome dos titulos das tabelas
  // SOURCE * https://stackoverflow.com/questions/206988/how-do-i-unset-an-element-in-an-array-in-javascript *
  async function getTableTitles() {
    const planetsList = await fetchPlanets();
    const titles = Object.keys(planetsList[0]);
    titles.splice(titles.indexOf('residents'), 1);

    setTableTitles(titles);
  }

  useEffect(() => {
    getPlanets();
    getTableTitles();
  }, []);

  const planetContext = {
    planets,
    tableTitles,
    filter,
    setFilter,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <PlanetContext.Provider value={ planetContext }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.shape,
}.isRequired;

export default PlanetProvider;
