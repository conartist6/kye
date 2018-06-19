import React, { PureComponent } from 'react';
import { Board } from 'potato-engine-components';
import GotoDialog from '../goto-dialog';
import StatusBar from '../status-bar';

import { connect } from 'react-redux';
import { entities } from 'potato-engine';

import './game.scss';
import '../entity/entity.scss';

export class Game extends PureComponent {
  render() {
    const { props } = this;
    const { board, victory } = props;

    const content = victory ? (
      <div className="victory">Victory!</div>
    ) : (
      [board && <Board board={board} key="board" />, <StatusBar key="status-bar" />]
    );

    return (
      <div className="game">
        <GotoDialog />
        {content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { board, victory } = state.game;
  return { board, victory };
}

export default connect(mapStateToProps)(Game);
