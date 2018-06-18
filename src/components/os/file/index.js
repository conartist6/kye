import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import './style.scss';

export class File extends Component {
  onMouseDown(evt) {
    if (evt.button !== 0) {
      return;
    }

    const { dispatch, name, selected } = this.props;

    evt.preventDefault();

    const now = Date.now();
    const isDblClick = selected && this._lastClick && now - this._lastClick < 500;

    this._lastClick = now;
    dispatch({
      type: isDblClick ? 'OPEN_FILE' : 'SELECT_FILE',
      name,
    });
  }
  render() {
    const { name, selected, dispatch } = this.props;
    return (
      <div className={cx({ file: true, selected })} onMouseDown={evt => this.onMouseDown(evt)}>
        <div className="icon" />
        <div className="filename">{name}</div>
      </div>
    );
  }
}

function mapStateToProps({ os: state }, props) {
  const selected = state.selectedFilename === props.name;
  return { selected };
}

export default connect(mapStateToProps)(File);
