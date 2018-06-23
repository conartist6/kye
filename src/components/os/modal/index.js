import React, { Component } from 'react';
import { Consumer as WindowContext, WindowInput } from '../window';
import PropTypes from 'prop-types';

/**
 * A modal is just a wrapper component which, when rendered, steals keyboard input focus from its parent window.
 **/
export class Modal extends Component {
  constructor(props) {
    super(props);
    this._input = new WindowInput(props.show, props.windowInput, `modal:${props.windowInput.name}`);
  }

  componentDidMount() {
    this._input.start();
  }

  componentWillUnmount() {
    this._input.end();
  }

  componentDidUpdate() {
    this._input.setFocused(this.props.show);
  }

  render() {
    return this.props.show ? this.props.children(this._input) : null;
  }
}
Modal.defaultProps = {
  show: true,
};
Modal.propTypes = {
  children: PropTypes.func.isRequired,
};

export default props => (
  <WindowContext>{windowInput => <Modal {...props} windowInput={windowInput} />}</WindowContext>
);
