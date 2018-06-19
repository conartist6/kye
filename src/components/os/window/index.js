import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import './style.scss';

export class Window extends Component {
  render() {
    const { file, app, appComponent: App } = this.props;
    return (
      <Draggable handle=".title-bar" bounds="parent">
        <div className="window">
          <div className="title-bar">{(file && file.name) || app.name}</div>
          <div className="window-content">
            <App />
          </div>
        </div>
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Window);
