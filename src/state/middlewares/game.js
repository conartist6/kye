import { getLevel, getInputMode } from '../game';
import { parseCampaign } from 'kye-parser-ascii';
import { Board, Game } from 'potato-engine';
import { Input } from 'potato-engine-components';
import MagnetismPlugin from 'potato-engine-plugin-magnetism';
import DeflectionPlugin from 'potato-engine-plugin-deflection';
import path from 'path';

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
      const { game } = state;
      game.tick(action.direction);
    }

    if (action.type === 'OPEN_FILE' && action.file.type === 'file') {
      const filename = action.file.name;

      if (path.extname(filename) === '.kye' && filename !== state.filename) {
        fetch(/campaigns/ + filename)
          .then(response => response.text())
          .then(file => parseCampaign(file))
          .then(campaign => {
            store.dispatch({
              type: 'LOAD_CAMPAIGN',
              campaign,
            });
          });
      }
    }

    let level = getLevel(state, action);

    if (level) {
      const game = new Game(
        new Board(level, {
          getState,
          record: true,
          plugins: [MagnetismPlugin, DeflectionPlugin],
          displayOnly: action.displayOnly,
        }),
      );

      input.setMode('game');

      if (!action.displayOnly) {
        const onMove = direction => {
          game.tick(direction);
        };
        const onPauseUnpause = () => {
          const { game, paused } = getState();
          game.setPaused(!paused);
          store.dispatch({ type: 'PAUSE_UNPAUSE' });
        };
        const onReset = () => {
          store.dispatch({ type: 'LOAD_LEVEL' });
        };
        input.on('move', onMove);
        input.on('pause-unpause', onPauseUnpause);
        input.on('reset', onReset);

        game.on('end', () => {
          input.off('move', onMove);
          input.off('pause-unpause', onPauseUnpause);
          input.off('reset', onReset);
        });
      }

      game.on('progress', entity => {
        store.dispatch({ type: 'PROGRESS', entity });
      });
      game.on('death', () => {
        store.dispatch({ type: 'DEATH' });
        const state = getState();
        if (state.kyes > 0) {
          state.game.board.respawnPlayer();
        }
      });
      game.on('win', recording => {
        window.setTimeout(() => {
          let state = getState();
          alert(state.level.header.completionMessage);
          store.dispatch({ type: 'WIN', recording });
          state = getState();
          if (state.victory) {
          }
        }, 0);
      });
      action.game = game;
      action.input = input;
    }

    return next(action);
  };
};
