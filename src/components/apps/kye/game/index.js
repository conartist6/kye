import React, { Component } from 'react';
import { Game } from 'potato-engine-components';
import GotoDialog from '../goto-dialog';
import StatusBar from '../status-bar';
import c from 'keycode-js';

import { connect } from 'react-redux';

import './game.scss';
import '../entity/entity.scss';

export class KyeGame extends Component {
  constructor(props) {
    super(props);
    this.keydown = this.keydown.bind(this);
  }

  componentDidMount() {
    this.setupInput();
  }

  componentWillUnmount() {
    this.teardownInput();
  }

  keydown(event) {
    const { dispatch, game } = this.props;
    switch (event.keyCode) {
      case c.KEY_P:
        game.setPaused(!game.paused);
        break;
      case c.KEY_R:
        dispatch({ type: 'LOAD_LEVEL' });
        break;
      case c.KEY_G:
        dispatch({ type: 'GOTO' });

        event.preventDefault();
        break;
    }
  }

  setupInput() {
    if (!this.props.displayOnly) {
      this._input = this.props.input;
      this._input.on('keydown', this.keydown);
      this._input.start();
    }
  }

  teardownInput() {
    if (this._input) {
      this._input.off('keydown', this.keydown);
      this._input.end();
      this._input = null;
    }
  }

  render() {
    const { game, input, victory } = this.props;
    const content = victory ? (
      <div className="victory">Victory!</div>
    ) : (
      [game && <Game input={input} game={game} key="game" />, <StatusBar key="status-bar" />]
    );

    return (
      <div className="game">
        <GotoDialog />
        {content}
      </div>
    );
  }
}

function mapStateToProps({ game: state }) {
  const { game, victory } = state;
  return { game, victory };
}

export default connect(mapStateToProps)(KyeGame);
