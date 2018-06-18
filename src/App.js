import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './state/store';
import Game from './components/game';
import Window from './components/os/window';
import OperatingSystem from './components/os';
import InitialOverlay from './components/initial-overlay';
import { Campaign, Level } from 'potato-engine';
import { parseBoard } from 'kye-parser-ascii';
import borderKye from './border.kye';

import './entities';

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
      <OperatingSystem>
        <Window>
          <InitialOverlay />
          <Game />
        </Window>
      </OperatingSystem>
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
      displayOnly: true,
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
