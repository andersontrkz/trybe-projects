import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MealList from '../components/MealList';
import CategoryFilter from '../components/CategoryFilter';

export default function Comidas({ match: { url } }) {
  const { openSearchBar, setCurr } = useContext(Context);

  useEffect(() => {
    setCurr('cocktails');
  }, []);

  return (
    <div>
      <Header title="Comidas" searchIcon />
      { openSearchBar ? <SearchBar url={ url } /> : undefined }
      <CategoryFilter type="meals" />
      <MealList />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  match: PropTypes.shape().isRequired,
};
