import React, { PureComponent } from 'react';
import { Game } from 'potato-engine-components';
import GotoDialog from '../goto-dialog';
import StatusBar from '../status-bar';

import { connect } from 'react-redux';
import { entities } from 'potato-engine';

import './game.scss';
import '../entity/entity.scss';

export class KyeGame extends PureComponent {
  render() {
    const { game, victory } = this.props;

    const content = victory ? (
      <div className="victory">Victory!</div>
    ) : (
      [game && <Game game={game} key="game" />, <StatusBar key="status-bar" />]
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
  const { game, victory } = state.game;
  return { game, victory };
}

export default connect(mapStateToProps)(KyeGame);
