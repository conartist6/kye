import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { SubspaceProvider } from 'react-redux-subspace';
import { createStore } from './store';
import { hydrate } from './state';
import KyeApp from './components/apps/kye';
import ReadmeApp from './components/apps/readme';
import { FunOS } from 'fun-web-os';
import { Campaign, Level } from 'potato-engine';
import { parseBoard } from 'kye-parser-ascii';
import borderKye from './border.kye';
import { List } from 'immutable';

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
    this.store = createStore(
      hydrate({
        fun: {
          fileExtensionAssociations: { '.kye': 'kye' },
          windows: [
            {
              appName: 'kye',
              file: { type: 'file', name: 'border.kye' },
            },
          ],
          desktopFiles: [
            { type: 'file', name: 'default.kye' },
            {
              type: 'app',
              name: 'README',
            },
          ],
        },
      }),
    );
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
        <SubspaceProvider mapState={state => state.fun} namespace="fun">
          <FunOS apps={this._apps} />
        </SubspaceProvider>
      </Provider>
    );
  }
}
