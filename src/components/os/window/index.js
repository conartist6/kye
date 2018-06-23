import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import EventEmitter from 'eventemitter2';
import { topWindow } from '../../../state/os';

import './style.scss';

export class WindowInput {
  constructor(focused, parentInput, name) {
    this.keydown = this.keydown.bind(this);
    this._emitter = new EventEmitter();
    this._paused = true;
    this._suppressed = 0;
    this._focused = focused;
    this._parentInput = parentInput;
    this._name = name;
  }

  setFocused(focused) {
    this._focused = focused;
    this.setPaused();
  }

  setSuppressed(isSuppressed) {
    this._suppressed += isSuppressed ? 1 : -1;
    this.setPaused();
  }

  isSuppressed() {
    return this._suppressed > 0;
  }

  keydown(event) {
    this._emitter.emit('keydown', event);
  }

  setPaused(paused = false) {
    paused = paused || this.isSuppressed() || !this._focused;
    if (paused === this._paused) {
      return;
    }

    if (this._parentInput) {
      this._parentInput.setSuppressed(!paused);
    }

    const { addEventListener, removeEventListener } = document;

    const method = paused ? removeEventListener : addEventListener;
    method.call(document, 'keydown', this.keydown);
    this._paused = paused;
  }

  on(...args) {
    this._emitter.on(...args);
  }

  off(...args) {
    this._emitter.off(...args);
  }

  get name() {
    return this._name;
  }

  get paused() {
    return this._paused;
  }

  start() {
    this.setPaused(false);
  }

  end() {
    this.setPaused(true);
  }
}

const context = React.createContext();
const { Provider } = context;
export const Consumer = context.Consumer;

export class Window extends Component {
  constructor(props) {
    super(props);
    this._input = new WindowInput(props.focused, null, props.window.appName);
  }

  componentDidMount() {
    this._input.start();
    this._fireFocusEvents();
  }

  componentWillUnmount() {
    this._input.end();
  }

  _fireFocusEvents() {
    if (this.props.focused) {
      this._app && this._app.onWindowFocus && this._app.onWindowFocus();
    } else {
      this._app && this._app.onWindowFocusLost && this._app.onWindowFocusLost();
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.focused !== this.props.focused) {
      this._fireFocusEvents();
    }
    this._input.setFocused(this.props.focused);
  }

  render() {
    const { window: wndw, app, dispatch } = this.props;
    const { file, zIndex } = wndw;
    const App = app.component;

    const refCapturer = typeof App.prototype.render ? ref => (this._app = ref) : null;

    return (
      <Provider value={this._input}>
        <Draggable handle=".title-bar" bounds="parent">
          <div
            className="window"
            style={{ zIndex }}
            data-index={zIndex}
            data-app-name={wndw.appName}
          >
            <div className="title-bar">
              <div
                className="close"
                onMouseDown={evt => evt.stopPropagation()}
                onClick={() => {
                  dispatch({
                    type: 'CLOSE_WINDOW',
                    window: wndw,
                  });
                }}
              />
              {(file && file.name) || app.name}
            </div>
            <div className="window-content">
              <App ref={refCapturer} input={this._input} />
            </div>
          </div>
        </Draggable>
      </Provider>
    );
  }
}

function mapStateToProps({ os: state }, props) {
  return { focused: topWindow(state) === props.window };
}

export default connect(mapStateToProps)(Window);
