import Button from '../components/Button';
import RankingList from '../components/RankingList';

const PropTypes = require('prop-types');

const React = require('react');

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <RankingList />
        <Button
          test="btn-go-home"
          clickable={ () => history.push('/') }
          value="Jogar Novamente"
        />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
