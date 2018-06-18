import React, { Component } from 'react';
import Dialog from '../dialog';
import Button from '../button';
import { connect } from 'react-redux';

import './style.scss';

export class InitialOverlay extends Component {
  submit(event) {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch({ type: 'DISMISS_INITIAL_OVERLAY' });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.welcoming && this.props.welcoming) {
      this._dismiss && this._dismiss.focus();
    }
  }

  render() {
    const { welcoming, dispatch } = this.props;

    return (
      <Dialog show={welcoming} className="initial-overlay">
        <h2>Kye</h2>
        <p className="authors">
          A game by Colin Garbutt
          <br />
          Implemented by Conrad Buck
        </p>
        <a href="https://github.com/conartist6/potato-engine">
          <img
            className="fork-me"
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
            alt="Fork me on GitHub"
          />
        </a>
        <div className="controls">
          <div className="keys wasd">
            <div className="key up">
              <span>W</span>
            </div>
            <div className="key left">
              <span>A</span>
            </div>
            <div className="key down">
              <span>S</span>
            </div>
            <div className="key right">
              <span>D</span>
            </div>
          </div>
          <span className="or">OR</span>
          <div className="keys arrow">
            <div className="key up">
              <span>↑</span>
            </div>
            <div className="key left">
              <span>←</span>
            </div>
            <div className="key down">
              <span>↓</span>
            </div>
            <div className="key right">
              <span>→</span>
            </div>
          </div>
        </div>
        {/*        <form onSubmit={event => this.submit(event)} onReset={event => this.submit(event)}>
          <div className="buttons">
            <Button type="submit">OK</Button>
          </div>
        </form>*/}
      </Dialog>
    );
  }
}

function mapStateToProps({ game: state }) {
  const { welcoming } = state;
  return { welcoming };
}

export default connect(mapStateToProps)(InitialOverlay);
