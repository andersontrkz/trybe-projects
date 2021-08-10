import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const PropTypes = require('prop-types');
const React = require('react');

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleSrc = this.handleSrc.bind(this);
  }

  handleSrc() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const gravatarLink = `https://gravatar.com/avatar/${hash}`;

    return gravatarLink;
  }

  render() {
    const { name, score } = this.props;

    return (
      <main>
        <h1>
          Name:
          <span data-testid="header-player-name">
            { name }
          </span>
        </h1>
        <img src={ this.handleSrc() } data-testid="header-profile-picture" alt="" />
        <h2>
          Score:
          <span data-testid="header-score">{ score }</span>
        </h2>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
