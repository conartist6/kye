import React, { PureComponent } from 'react';
import { Board, Entity } from 'potato-engine-components';
import { range, map } from 'iter-tools/es2015';
import GotoDialog from '../goto-dialog';

import { connect } from 'react-redux';
import { entities } from 'potato-engine';

import './game.css';
import '../entity/entity.css';

export class Game extends PureComponent {
  render() {
    const { props } = this;
    const { hint, index, diamondsLeft: diamonds, board, victory } = props;
    const Player = new entities.Player();
    const kyes = Array.from(map(i => <Entity entity={Player} key={i} />, range(props.kyes)));

    const content = victory ? (
      <div className="victory">Victory!</div>
    ) : (
      [
        board && <Board board={board} key="board" />,
        <div className="status-bar" key="status-bar">
          <div className="status">
            <div className="kyes">{kyes}</div>
            <div className="diamonds">{index != null ? `Level: ${index}` : null}</div>
            <div className="level">{diamonds != null ? `Diamonds left: ${diamonds}` : null}</div>
          </div>
          <div className="hint">{hint}</div>
        </div>,
      ]
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
  const { kyes, board, level, diamondsLeft, victory } = state.game;
  const hint = level && level.header.hint;
  const index = level && level.index;

  return { kyes, board, hint, index, diamondsLeft, victory };
}

export default connect(mapStateToProps)(Game);
