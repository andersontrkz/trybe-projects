import React, { useContext } from 'react';
import Context from '../../context/Context';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import IngredientList from '../../components/IngredientList';

export default function ExpBebidasIngredientes() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <IngredientList type="drinks" />
      <Footer />
    </div>
  );
}
