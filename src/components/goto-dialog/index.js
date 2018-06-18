import React, { Component } from 'react';
import Dialog from '../dialog';
import Button from '../button';
import { connect } from 'react-redux';

import './goto-dialog.css';

class GotoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '' };
  }

  submit(event) {
    event.preventDefault();
    const { code } = this.state;
    const { dispatch } = this.props;

    this.setState({ code: '' });
    if (event.type === 'submit') {
      dispatch({ type: 'LOAD_LEVEL', code });
    } else {
      dispatch({ type: 'CANCEL_GOTO' });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.showGotoDialog && this.props.showGotoDialog) {
      this._input && this._input.focus();
    }
  }

  render() {
    const { showGotoDialog, dispatch } = this.props;

    return (
      <Dialog show={showGotoDialog} className="goto-dialog">
        <h3>Skip to level</h3>
        <form onSubmit={event => this.submit(event)} onReset={event => this.submit(event)}>
          Code:
          <input
            className="code"
            ref={ref => (this._input = ref)}
            onChange={event => this.setState({ code: event.target.value })}
            value={this.state.code}
          />
          <div className="buttons">
            <button type="reset">CANCEL</button>
            <button type="submit">GO</button>
          </div>
        </form>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  const { showGotoDialog } = state.game;

  return { showGotoDialog };
}
export default connect(mapStateToProps)(GotoDialog);
