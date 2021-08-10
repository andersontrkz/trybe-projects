import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import '../styles/header.css';

import SearchIcon from './SearchIcon';
import ProfileIcon from './ProfileIcon';

export default function Header(props) {
  const {
    title = 'TÍTULO',
    searchIcon = false,
  } = props;

  return (
    <Container bsPrefix="header container">
      <Row bsPrefix="flex row">
        <ProfileIcon />
        <Col>
          <h1 data-testid="page-title">
            { title }
          </h1>
        </Col>
        { searchIcon ? <SearchIcon /> : undefined }
      </Row>
    </Container>
  );
}

Header.propTypes = {
  props: PropTypes.shape(),
}.isRequired;
