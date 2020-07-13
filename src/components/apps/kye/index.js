import React, { Component } from 'react';
import { connect } from 'react-redux';
import InitialOverlay from './initial-overlay';
import Game from './game';

export class KyeApp extends Component {
  componentDidUpdate(oldProps) {
    const { levelCode, defaultTitle, setTitle } = this.props;
    if (oldProps.levelCode !== levelCode) {
      const levelCodeSuffix = levelCode ? ` - ${levelCode}` : '';
      setTitle(defaultTitle + levelCodeSuffix);
    }
  }

  render() {
    const { input } = this.props;
    return (
      <div className="app kye-app">
        <InitialOverlay />
        <Game input={input} />
      </div>
    );
  }
}

function mapStateToProps({ game: state }) {
  const { level, welcoming } = state;
  const levelCode = welcoming ? null : level && level.header.code;
  return { levelCode };
}

export default connect(mapStateToProps)(KyeApp);
