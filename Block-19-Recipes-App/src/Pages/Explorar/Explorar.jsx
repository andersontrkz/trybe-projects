import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Context from '../../context/Context';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';

export default function Explorar() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <ButtonGroup vertical>
        <Button
          href="/explorar/comidas"
          data-testid="explore-food"
          variant="outline-primary"
          size="lg"
          className="mb-2"
        >
          Explorar Comidas
        </Button>
        <Button
          href="/explorar/bebidas"
          data-testid="explore-drinks"
          variant="outline-danger"
          size="lg"
          className="mb-2"
        >
          Explorar Bebidas
        </Button>
      </ButtonGroup>
      <Footer />
    </div>
  );
}
