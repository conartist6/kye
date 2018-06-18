import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import './style.scss';

export class Window extends Component {
  render() {
    const { filename, children } = this.props;
    return (
      <Draggable handle=".title-bar" bounds="parent">
        <div className="window">
          <div className="title-bar">{filename}</div>
          <div className="window-content">{children}</div>
        </div>
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  const { filename } = state.game;
  return { filename };
}

export default connect(mapStateToProps)(Window);
