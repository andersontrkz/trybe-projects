import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {
  generateRadioCategories = () => {
    const { categories, onSelect } = this.props;
    return (
      <section>
        {
          categories.map((category) => {
            const { name } = category;
            return (
              <ul key={ name }>
                <li>
                  <label htmlFor={ name }>
                    <input
                      onChange={ (event) => onSelect(event) }
                      type="radio"
                      key={ name }
                      id={ name }
                      name="category"
                      data-testid="category"
                      value={ name }
                    />
                    { name }
                  </label>
                </li>
              </ul>
            );
          })
        }
      </section>
    );
  }

  render() {
    return (
      <section>
        <h1>
          Escolha a categoria:
        </h1>
        { this.generateRadioCategories() }
      </section>
    );
  }
}
CategoryList.propTypes = {
  categories: PropTypes.array,
  onSelect: PropTypes.func,
}.isRequired;
export default CategoryList;
