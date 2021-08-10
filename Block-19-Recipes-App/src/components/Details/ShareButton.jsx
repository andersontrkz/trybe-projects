import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Container, Button, Image } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ id, type, index }) {
  const [isCopied, setIsCopied] = useState(false);

  // Ação de clicar no botão compartilhar
  const handleShare = () => {
    const SECONDS = 3000;

    copy(`http://localhost:3000/${type}s/${id}`);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), SECONDS);
  };

  const shareButtonContent = () => {
    if (isCopied) {
      return <span variant="primary">Link copiado!</span>;
    }
    return <Image data-testid={ `${index}-horizontal-share-btn` } src={ shareIcon } />;
  };

  return (
    <Container>
      <Button
        block
        data-testid="share-btn"
        onClick={ handleShare }
        variant="primary"
      >
        { shareButtonContent() }
      </Button>
    </Container>
  );
}

ShareButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
