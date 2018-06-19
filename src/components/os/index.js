import React, { Component } from 'react';
import { connect } from 'react-redux';
import Desktop from './desktop';
import Window from './window';
import selectParent from 'select-parent';

import './style.scss';

export class OS extends Component {
  onMouseDown(evt) {
    const { dispatch } = this.props;
    const windowTarget = selectParent('.window', evt.target);
    const target = windowTarget ? windowTarget.dataset.appName : 'desktop';

    dispatch({
      type: 'FOCUS',
      target,
    });
  }

  render() {
    const { windows, apps, children } = this.props;
    const windowEls = windows.map(wndw => {
      return <Window window={wndw} app={apps.get(wndw.appName)} key={wndw.appName} />;
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
