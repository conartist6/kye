import React, { PureComponent } from 'react';
import { Board, Entity } from 'potato-engine-components';
import { range, map } from 'iter-tools/es2015';
import GotoDialog from '../goto-dialog';
import cx from 'classnames';

import { connect } from 'react-redux';
import { entities } from 'potato-engine';

import './game.scss';
import '../entity/entity.scss';

export class Game extends PureComponent {
  render() {
    const { props } = this;
    const { hint, index, diamondsLeft: diamonds, board, victory, welcoming } = props;
    const kyes = Array.from(map(i => <div className="entity player" key={i} />, range(props.kyes)));

    const statusBarContent = welcoming ? (
      <div className="welcoming">
        Kye is open source. You can see and fork the code on{' '}
        <a href="https://github.com/conartist6/kye">Github</a>.
      </div>
    ) : (
      [
        <div className="status" key="status">
          <div className="kyes">{kyes}</div>
          <div className="diamonds">{index != null ? `Level: ${index}` : null}</div>
          <div className="level">{diamonds != null ? `Diamonds left: ${diamonds}` : null}</div>
        </div>,
        <div className="hint" key="hint">
          {hint}
        </div>,
      ]
    );

    const content = victory ? (
      <div className="victory">Victory!</div>
    ) : (
      [
        board && <Board board={board} key="board" />,
        <div className="status-bar" key="status-bar">
          {statusBarContent}
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
  const { kyes, board, level, diamondsLeft, victory, welcoming } = state.game;
  const hint = level && level.header.hint;
  const index = level && level.index;

  return { kyes, board, hint, index, diamondsLeft, victory, welcoming };
}

export default connect(mapStateToProps)(Game);
