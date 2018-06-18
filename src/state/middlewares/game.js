import { getLevel, getInputMode } from '../game';
import { Board } from 'potato-engine';
import { Input } from 'potato-engine-components';
import MagnetismPlugin from 'potato-engine-plugin-magnetism';

export default store => {
  function getState() {
    return store.getState().game;
  }
  const input = new Input(() => getInputMode(getState()));
  input.start();

  input.on('goto', () => {
    store.dispatch({ type: 'GOTO' });
  });
  input.on('cancel-goto', () => {
    store.dispatch({ type: 'CANCEL_GOTO' });
  });

  return next => action => {
    const state = getState();

    if (action.type === 'INPUT') {
      const { board } = state;
      board.tick(action.direction);
    }

    let level = getLevel(state, action);

    if (level) {
      const board = new Board(level, level.dimensions, {
        getState,
        record: true,
        plugins: [MagnetismPlugin],
        displayOnly: state.welcoming,
      });
      input.setMode('game');

      const onMove = direction => {
        board.tick(direction);
      };
      const onPauseUnpause = () => {
        const { board, paused } = getState();
        board.setPaused(!paused);
        store.dispatch({ type: 'PAUSE_UNPAUSE' });
      };
      const onReset = () => {
        store.dispatch({ type: 'LOAD_LEVEL' });
      };
      if (!state.welcoming) {
        input.on('move', onMove);
        input.on('pause-unpause', onPauseUnpause);
        input.on('reset', onReset);
      }

      board.on('end', () => {
        input.off('move', onMove);
        input.off('pause-unpause', onPauseUnpause);
        input.off('reset', onReset);
      });
      board.on('progress', entity => {
        store.dispatch({ type: 'PROGRESS', entity });
      });
      board.on('death', () => {
        store.dispatch({ type: 'DEATH' });
        const state = getState();
        if (state.kyes > 0) {
          state.board.respawnPlayer();
        }
      });
      board.on('win', recording => {
        requestIdleCallback(() => {
          let state = getState();
          alert(state.level.header.completionMessage);
          store.dispatch({ type: 'WIN', recording });
          state = getState();
          if (state.victory) {
          }
        });
      });
      action.board = board;
      action.input = input;
    }

    return next(action);
  };
};
