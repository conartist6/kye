import React, { Component } from 'react';
import { connect } from 'react-redux';
import Desktop from './desktop';
import Window from './window';
import selectParent from 'select-parent';
import { map } from 'iter-tools/es2015';

import './style.scss';

export class OS extends Component {
  onMouseDown(evt) {
    const { dispatch, windows } = this.props;
    const windowTarget = selectParent('.window', evt.target);
    const target = windowTarget ? windowTarget.dataset.appName : 'desktop';

    window.__dispatch = dispatch;

    if (target === 'desktop' || windowTarget.dataset.index < windows.size) {
      dispatch({
        type: 'FOCUS',
        target,
      });
    }
  }

  render() {
    const { windows, apps, children } = this.props;

    const windowEls = windows.map(wndw => {
      return (
        <Window
          window={wndw}
          app={apps.get(wndw.appName)}
          data-app-name={wndw.appName}
          key={wndw.appName}
        />
      );
    });
    return (
      <div className="operating-system" onMouseDown={evt => this.onMouseDown(evt)}>
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
