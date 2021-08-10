import React, { Component } from 'react';

const PropTypes = require('prop-types');

class Input extends Component {
  render() {
    const {
      test,
      onChange,
      label,
      id,
      type,
    } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <input
          id={ id }
          name={ id }
          data-testid={ test }
          onChange={ onChange }
          type={ type }
        />
      </label>
    );
  }
}

Input.propTypes = {
  test: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Input;
