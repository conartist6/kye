import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './state/store';
import GameWindow from './components/game-window';
import InitialOverlay from './components/initial-overlay';
import { Campaign, Level } from 'potato-engine';
import { parseBoard } from 'kye-parser-ascii';
import borderKye from './border.kye';

import './entities';

function* iterateArray2d(array2d) {
  for (const row of array2d) {
    for (const cell of row) {
      yield cell;
    }
  }
}

const backgroundCampaign = new Campaign([
  new Level(
    borderKye.header,
    borderKye.dimensions,
    parseBoard(borderKye.ascii.split('\n')),
    borderKye.index,
  ),
]);

function App() {
  return (
    <div className="app">
      <GameWindow />
      <InitialOverlay />
    </div>
  );
}

export default class AppRoot extends Component {
  constructor() {
    super();
    this.store = createStore();
  }
  componentDidMount() {
    this.store.dispatch({
      type: 'LOAD_CAMPAIGN',
      campaign: backgroundCampaign,
    });
  }
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}
