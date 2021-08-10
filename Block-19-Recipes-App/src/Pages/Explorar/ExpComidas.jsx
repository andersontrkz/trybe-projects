import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Context from '../../context/Context';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';

export default function ExpComidas() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <ButtonGroup vertical>
        <Button
          href="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
          variant="outline-primary"
          size="lg"
          className="mb-2"
        >
          Por Ingredientes
        </Button>
        <Button
          href="/explorar/comidas/area"
          data-testid="explore-by-area"
          variant="outline-danger"
          size="lg"
          className="mb-2"
        >
          Por Local de Origem
        </Button>
        <Button
          href="/comidas/:id"
          data-testid="explore-surprise"
          variant="outline-dark"
          size="lg"
          className="mb-2"
          // onClick={ () => alert('Surprise Meal') }
        >
          Me Surpreenda!
        </Button>
        {/* <Button
          href="/explorar/"
          variant="danger"
          size="lg"
          className="mb-2"
        >
          Voltar
        </Button> */}
      </ButtonGroup>
      <Footer />
    </div>
  );
}
