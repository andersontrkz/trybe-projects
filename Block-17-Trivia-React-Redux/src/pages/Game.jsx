import PropTypes from 'prop-types';

import Header from '../components/Header';
import Questions from '../components/Questions';

const React = require('react');

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Questions history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Game;
