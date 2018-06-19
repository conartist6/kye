import React from 'react';
import { connect } from 'react-redux';
import { range, map } from 'iter-tools/es2015';

import './style.scss';

export function StatusBar(props) {
  const { hint, index, diamondsLeft: diamonds, welcoming } = props;
  const kyes = Array.from(map(i => <div className="entity player" key={i} />, range(props.kyes)));

  const statusBarContent = welcoming
    ? [
        <div className="status welcoming" key="w-status">
          You can see and fork this code on <a href="https://github.com/conartist6/kye">Github</a>!
        </div>,
        <div className="hint" key="w-hint">
          Read the README first?
        </div>,
      ]
    : [
        <div className="status" key="status">
          <div className="kyes">{kyes}</div>
          <div className="diamonds">{index != null ? `Level: ${index}` : null}</div>
          <div className="level">{diamonds != null ? `Diamonds left: ${diamonds}` : null}</div>
        </div>,
        <div className="hint" key="hint">
          {hint}
        </div>,
      ];

  return <div className="status-bar">{statusBarContent}</div>;
}

function mapStateToProps(state) {
  const { kyes, level, diamondsLeft, welcoming } = state.game;
  const hint = level && level.header.hint;
  const index = level && level.index;

  return { kyes, hint, index, diamondsLeft, welcoming };
}

export default connect(mapStateToProps)(StatusBar);
