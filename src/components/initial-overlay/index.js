import React, { Component } from 'react';
import Dialog from '../dialog';
import Button from '../button';
import { Entity } from 'potato-engine-components';
import { entities } from 'potato-engine';
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
        <h2>
          Kye <div className="entity player" />
        </h2>
        <p className="authors">
          An es6 game by Conrad Buck
          <br />
          Ported from a <a href="https://classicreload.com/win3x-kye.html">win16 game</a> by Colin
          Garbutt
        </p>
        <p>Open a level file to begin!</p>
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
