import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { playerScore } from '../actions';

import '../css/Questions.css';
import Button from './Button';

const TIMER = 30;
const CORRECT = 'correct-answer';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      isClicked: false,
      timer: TIMER,
      score: 0,
      assertions: 0,
    };

    this.answerQuestion = this.answerQuestion.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.setDataTestid = this.setDataTestid.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.defineInterval = this.defineInterval.bind(this);
    this.checkInterval = this.checkInterval.bind(this);
    this.getScore = this.getScore.bind(this);
    this.multiplier = this.multiplier.bind(this);
    this.handleSrc = this.handleSrc.bind(this);
  }

  componentDidMount() {
    this.defineInterval();
  }

  setDataTestid(answer) {
    const { questions } = this.props;
    const { index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    if (incorrect.includes(answer)) {
      const incorrectIndex = incorrect.indexOf(answer);
      return `wrong-answer-${incorrectIndex}`;
    }
    return CORRECT;
  }

  getScore({ target }) {
    if (target.id === CORRECT) {
      const { index, timer, score, assertions } = this.state;
      const { questions, sendPlayerScore } = this.props;
      const { difficulty } = questions[index];
      const multiplier = this.multiplier(difficulty);
      const RIGHT_ANSWER = 10;
      const questionScore = RIGHT_ANSWER + (timer * multiplier);

      this.setState({
        score: score + questionScore,
        assertions: assertions + 1,
      }, () => {
        const { score: newScore, assertions: newAssertion } = this.state;
        sendPlayerScore({
          score: newScore,
          assertions: newAssertion,
        });
      });
    }
  }

  setClassName(answer) {
    const { questions } = this.props;
    const { index } = this.state;
    const incorrect = questions[index].incorrect_answers;
    if (incorrect.includes(answer)) {
      return 'wrong-answer';
    }
    return CORRECT;
  }

  answerQuestion(event) {
    this.setState({ isClicked: true });
    this.getScore(event);
  }

  multiplier(difficulty) {
    const THREE = 3;
    const TWO = 2;
    const ONE = 1;
    switch (difficulty) {
    case 'hard':
      return THREE;
    case 'medium':
      return TWO;
    case 'easy':
      return ONE;
    default:
      return ONE;
    }
  }

  defineInterval() {
    const ONE_SECOND = 1000;
    setInterval(this.checkInterval, ONE_SECOND);
  }

  checkInterval() {
    const { timer, isClicked } = this.state;

    if (timer === 0 || isClicked) {
      this.setState({ isClicked: true });
      return clearInterval();
    }
    this.setState({ timer: timer - 1 });
  }

  handleSrc() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const gravatarLink = `https://gravatar.com/avatar/${hash}`;

    return gravatarLink;
  }

  nextQuestion() {
    const { index } = this.state;
    const { questions, history, player } = this.props;
    if (index < questions.length - 1) {
      this.setState({
        index: index + 1,
        isClicked: false,
        timer: TIMER,
      });
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const newPlayer = {
        name: player.name,
        score: player.score,
        picture: this.handleSrc(),
      };

      localStorage.setItem('ranking', JSON.stringify([...ranking, newPlayer]));
      history.push('/feedback');
    }
  }

  handleAnswers() {
    const { index, isClicked } = this.state;
    const { questions } = this.props;
    const answers = [
      ...questions[index].incorrect_answers,
      questions[index].correct_answer,
    ];
    const sortAnswers = answers.sort();
    return (
      sortAnswers.map((answer) => (
        <Button
          id={ this.setClassName(answer) }
          test={ this.setDataTestid(answer) }
          value={ unescape(answer) }
          className={ isClicked ? this.setClassName(answer) : null }
          disableButton={ isClicked }
          clickable={ this.answerQuestion }
          key={ unescape(answer) }
        />
      ))
    );
  }

  render() {
    const { timer, isClicked, index } = this.state;
    const { questions } = this.props;

    return (

      <div>
        <h1 data-testid="question-category">
          { unescape(questions[index].category) }
        </h1>
        <span data-testid="question-text">
          { unescape(questions[index].question) }
        </span>

        {this.handleAnswers()}

        { isClicked
          ? (
            <Button
              test="btn-next"
              clickable={ this.nextQuestion }
              value="Próxima"
            />)
          : null }

        <p>{ timer }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  sendPlayerScore: (state) => dispatch(playerScore(state)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  sendPlayerScore: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  player: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
