import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from './state/store';
import KyeApp from './components/apps/kye';
import ReadmeApp from './components/apps/readme';
import Window from './components/os/window';
import { State as OSState, Window as WindowState, File, App as AppState } from './state/os';
import OperatingSystem from './components/os';
import { Campaign, Level } from 'potato-engine';
import { parseBoard } from 'kye-parser-ascii';
import borderKye from './border.kye';
import { List, Map } from 'immutable';

import './entities';

const backgroundCampaign = new Campaign([
  new Level({
    ...borderKye,
    board: parseBoard(borderKye.ascii.split('\n')),
  }),
]);

export default class AppRoot extends Component {
  constructor() {
    super();
    this._apps = List([
      { name: 'kye', component: KyeApp },
      { name: 'README', component: ReadmeApp },
    ])
      .toKeyedSeq()
      .mapKeys((_, app) => app.name)
      .toMap();
    this.store = createStore({
      os: OSState({
        fileExtensionAssociations: Map({ '.kye': 'kye' }),
        windows: List([
          WindowState({
            appName: 'kye',
            file: File({ type: 'file', name: 'border.kye' }),
          }),
        ]),
        desktopFiles: List([
          File({ type: 'file', name: 'default.kye' }),
          File({
            type: 'app',
            name: 'README',
          }),
        ]),
      }),
    });
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
        <OperatingSystem apps={this._apps} />
      </Provider>
    );
  }
}
