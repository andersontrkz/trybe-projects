import React, { useContext } from 'react';
import { Col, Image } from 'react-bootstrap';
import Context from '../context/Context';

import searchIcon from '../images/searchIcon.svg';

export default function SearchIcon() {
  const { handleSearchBar } = useContext(Context);

  return (
    <Col>
      <Image
        src={ searchIcon }
        data-testid="search-top-btn"
        onClick={ handleSearchBar }
      />
    </Col>
  );
}
