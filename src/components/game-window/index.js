import React, { Component } from 'react';
import Game from '../game';

import './style.scss';

export default class GameWindow extends Component {
  render() {
    return (
      <div className="window">
        <Game {...this.props} />
      </div>
    );
  }
}
