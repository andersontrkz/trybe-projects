import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';

import profileIcon from '../images/profileIcon.svg';

export default function Header() {
  const history = useHistory();

  return (
    <Col>
      <Image
        src={ profileIcon }
        data-testid="profile-top-btn"
        onClick={ () => history.push('/perfil') }
      />
    </Col>
  );
}
