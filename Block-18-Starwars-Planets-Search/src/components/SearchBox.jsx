import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

const DECIMAL_RADIX = 10;

function SearchBox() {
  const { filter, setFilter, planets, setFilteredPlanets } = useContext(PlanetContext);
  const [tableTitles, setTableTitles] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [currentFilters, setCurrentFilters] = useState([]);

  // Gera o select de filtro por colunas
  function generateSelectColumnOptions() {
    return tableTitles.map(
      (title) => <option key={ title } value={ title }>{ title }</option>,
    );
  }

  // Remove uma opção do select de colunas
  function updateColumnOption(column) {
    const titles = tableTitles;
    // const filters = currentFilters;
    const filteredTitles = titles.filter((title) => title !== column);

    setTableTitles(filteredTitles); // Remove
    // setCurrentFilters([...filters, column]); // Adiciona
  }

  // Repõe a opção do select
  function replaceColumnOption(column) {
    // const titles = tableTitles;
    const filters = currentFilters;
    const filteredFilters = filters.filter((filterParam) => filterParam !== column);

    setCurrentFilters(filteredFilters); // Remove
    // setTableTitles([...titles, column]); // Adiciona
  }

  // Captura os eventos no form de busca
  function catchFilter({ id, value }) {
    const { filterByNumericValues } = filter;
    const {
      column: oldColumn, comparison: oldComparasion, value: oldValue,
    } = filterByNumericValues[0];

    switch (id) {
    case 'name-filter':
      setFilter({ ...filter, filterByName: { name: value } });
      break;
    case 'column-filter':
      setFilter({
        ...filter,
        filterByNumericValues: [{
          column: value, comparison: oldComparasion, value: oldValue }] });
      break;
    case 'comparison-filter':
      setFilter({
        ...filter,
        filterByNumericValues: [{
          column: oldColumn, comparison: value, value: oldValue }] });
      break;
    case 'value-filter':
      setFilter({
        ...filter,
        filterByNumericValues: [{
          column: oldColumn, comparison: oldComparasion, value }] });
      break;
    default:
      break;
    }
  }

  // Filtra os planetas na tabela
  function handleClickFilter() {
    const { filterByNumericValues } = filter;
    const { column, comparison, value } = filterByNumericValues[0];
    let filteredPlanets = [];

    switch (comparison) {
    case 'maior que':
      filteredPlanets = planets.filter(
        ({ [column]: columnFilter }) => (
          parseInt(columnFilter, DECIMAL_RADIX) > parseInt(value, DECIMAL_RADIX)),
      );
      break;
    case 'menor que':
      filteredPlanets = planets.filter(
        ({ [column]: columnFilter }) => (
          parseInt(columnFilter, DECIMAL_RADIX) < parseInt(value, DECIMAL_RADIX)),
      );
      break;
    case 'igual a':
      filteredPlanets = planets.filter(
        ({ [column]: columnFilter }) => (
          parseInt(columnFilter, DECIMAL_RADIX) === parseInt(value, DECIMAL_RADIX)),
      );
      break;
    default:
      break;
    }

    setFilteredPlanets(filteredPlanets);
    updateColumnOption(column);
  }

  function generateCurrentFiltersTable() {
    if (currentFilters) {
      return currentFilters.map((currentFilter) => (
        <tr key={ filter }>
          <td>{ currentFilter }</td>
          <td>
            <button type="button" onClick={ () => replaceColumnOption() }>X</button>
          </td>
        </tr>));
    }
  }

  return (
    <section>
      <input
        id="name-filter"
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => catchFilter(target) }
      />
      <br />
      <select
        id="column-filter"
        data-testid="column-filter"
        onChange={ ({ target }) => catchFilter(target) }
      >
        { generateSelectColumnOptions() }
      </select>
      <select
        id="comparison-filter"
        data-testid="comparison-filter"
        onChange={ ({ target }) => catchFilter(target) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        id="value-filter"
        type="text"
        data-testid="value-filter"
        onChange={ ({ target }) => catchFilter(target) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClickFilter() }
      >
        Filtrar
      </button>
      <table>
        <tbody>
          { generateCurrentFiltersTable() }
        </tbody>
      </table>
    </section>
  );
}

export default SearchBox;
