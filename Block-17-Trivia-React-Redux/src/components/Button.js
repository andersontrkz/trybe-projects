import React, { Component } from 'react';

const PropTypes = require('prop-types');

class Button extends Component {
  render() {
    const {
      test,
      disableButton = false,
      clickable,
      value,
      id = value,
      className = null,
    } = this.props;
    return (
      <button
        id={ id }
        className={ className }
        key={ value }
        type="button"
        data-testid={ test }
        disabled={ disableButton }
        onClick={ clickable }
      >
        {value}
      </button>
    );
  }
}

Button.propTypes = {
  test: PropTypes.string,
  disableButton: PropTypes.bool,
  clickable: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
}.isRequired;

export default Button;
