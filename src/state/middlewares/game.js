import { getLevel, getInputMode } from '../game';
import { parseCampaign } from 'kye-parser-ascii';
import { Board, Game } from 'potato-engine';
import MagnetismPlugin from 'potato-engine-plugin-magnetism';
import DeflectionPlugin from 'potato-engine-plugin-deflection';
import path from 'path';

export default store => {
  function getState() {
    return store.getState().game;
  }

  return next => action => {
    const state = getState();

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
    }

    return next(action);
  };
};
