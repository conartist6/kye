import React, { Component } from 'react';
import Dialog from '../../../dialog';
import Button from '../../../button';
import { Modal } from 'fun-web-os';
import { connect } from 'react-redux';
import c from 'keycode-js';

import './goto-dialog.scss';

class GotoDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { code: '' };
    this.keydown = this.keydown.bind(this);
  }

  componentDidMount() {
    this._inputEl && this._inputEl.focus();

    this.setupInput();
  }

  componentWillUnmount() {
    this.teardownInput();
  }

  keydown(event) {
    const { dispatch, game } = this.props;
    switch (event.keyCode) {
      case c.KEY_ESCAPE:
        dispatch({ type: 'CANCEL_GOTO' });
        break;
    }
  }

  setupInput() {
    this.props.input.on('keydown', this.keydown);
  }

  teardownInput() {
    this.props.input.off('keydown', this.keydown);
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

  render() {
    return (
      <Dialog className="goto-dialog">
        <h3>Skip to level</h3>
        <form onSubmit={event => this.submit(event)} onReset={event => this.submit(event)}>
          Code:
          <input
            className="code"
            ref={ref => (this._inputEl = ref)}
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

const GotoDialogWithInput = props => (
  <Modal show={props.showGotoDialog}>{input => <GotoDialog {...props} input={input} />}</Modal>
);

function mapStateToProps(state) {
  const { showGotoDialog } = state.game;

  return { showGotoDialog };
}
export default connect(mapStateToProps)(GotoDialogWithInput);
