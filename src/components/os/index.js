import React, { Component } from 'react';
import { connect } from 'react-redux';
import Desktop from './desktop';
import Window from './window';

import './style.scss';

export class OS extends Component {
  render() {
    const { windows, apps, children } = this.props;
    const windowEls = windows.map(wndw => {
      return <Window window={wndw} app={apps.get(wndw.appName)} />;
    });
    return (
      <div className="operating-system">
        <Desktop />
        {windowEls}
      </div>
    );
  }
}

function mapStateToProps({ os: state }) {
  const { windows } = state;
  return { windows };
}

export default connect(mapStateToProps)(OS);
