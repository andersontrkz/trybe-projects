import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import Context from '../context/Context';

export default function SearchBar({ url }) {
  const [filter, setFilter] = useState({ searchText: '', filter: 'ingredient' });
  const { findMealsByFilter, findCocktailsByFilter } = useContext(Context);
  const vinteQuatro = 24;
  const handleChange = ({ name, value }) => {
    if (name !== 'searchText') {
      setFilter({ [name]: value, searchText: '' });
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  const filterByFirstLetter = () => {
    const NUMBER = 24;
    if (filter.filter === 'firstLetter') {
      return 1;
    }
    return NUMBER;
  };

  const filterByType = (filt) => {
    if (url === '/comidas') {
      findMealsByFilter(filt);
    }
    if (url === '/bebidas') {
      findCocktailsByFilter(filt);
    }
  };

  const alertChar = () => {
    const newAlert = 'Sua busca deve conter somente 1 (um) caracter';
    global.alert(newAlert);
    return vinteQuatro;
  };

  return (
    <Container>
      <input
        type="text"
        data-testid="search-input"
        name="searchText"
        value={ filter.searchText }
        maxLength={ filterByFirstLetter() }
        onChange={ ({ target }) => handleChange(target) }
      />

      <Form.Group as={ Row }>
        <Form.Label as="legend" column sm={ 2 }>
          Pesquisar por:
        </Form.Label>
        <Col sm={ 10 }>
          <Form.Check
            onChange={ ({ target }) => handleChange(target) }
            data-testid="ingredient-search-radio"
            type="radio"
            label="Ingredientes"
            value="ingredient"
            name="filter"
          />
          <Form.Check
            onChange={ ({ target }) => handleChange(target) }
            data-testid="name-search-radio"
            type="radio"
            label="Nome"
            value="name"
            name="filter"
          />
          <Form.Check
            onChange={ ({ target }) => handleChange(target) }
            data-testid="first-letter-search-radio"
            type="radio"
            label="Primeira Letra"
            name="filter"
            value="firstLetter"
            onClick={ () => alertChar() }
          />
        </Col>
      </Form.Group>
      <Form.Group as={ Row }>
        <Col sm={ { span: 10, offset: 2 } }>
          <Button
            data-testid="exec-search-btn"
            type="button"
            onClick={ () => filterByType(filter) }
          >
            Pesquisar
          </Button>
        </Col>
      </Form.Group>
    </Container>
  );
}

SearchBar.propTypes = {
  url: PropTypes.string.isRequired,
};
