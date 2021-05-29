import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { onTyped, saveProducts } = this.props;
    return (
      <section>
        <input data-testid="query-input" onChange={ (event) => onTyped(event) } />
        <button type="submit" data-testid="query-button" onClick={ saveProducts }>
          Buscar
        </button>
      </section>
    );
  }
}

Header.propTypes = {
  onTyped: PropTypes.func.isRequired,
  saveProducts: PropTypes.func.isRequired,
};

export default Header;
