import { Record, List } from 'immutable';
import { entities } from 'potato-engine';

const kyes = 3;

const State = Record({
  filename: 'border.kye',
  welcoming: true,
  board: null,
  kyes, // lives
  campaign: null,
  level: null,
  diamondsLeft: null,
  paused: false,
  victory: false,
  recordings: List(),
  showGotoDialog: false,
});

export default function game(state = new State(), action) {
  switch (action.type) {
    case 'LOAD_CAMPAIGN':
      state = State().withMutations(state => {
        state.campaign = action.campaign;
        changeLevel(state, action);
      });
      break;
    case 'PAUSE_UNPAUSE':
      state = state.set('paused', !state.paused);
      break;
    case 'PROGRESS':
      state = state.set('diamondsLeft', state.diamondsLeft - 1);
      break;
    case 'LOAD_LEVEL':
      state = state.withMutations(state => {
        changeLevel(state, action);
        state.showGotoDialog = false;
      });
      break;
    case 'DEATH':
      state = state.set('kyes', state.kyes - 1);
      break;
    case 'WIN':
      state = state.withMutations(state => {
        state.recordings = state.recordings.push(action.recording);
        changeLevel(state, action);
        if (!state.level) {
          state.victory = true;
        }
      });
      break;
    case 'GOTO':
      state = state.set('showGotoDialog', true);
      break;
    case 'CANCEL_GOTO':
      state = state.set('showGotoDialog', false);
      break;
    case 'DISMISS_INITIAL_OVERLAY':
      state = state.set('welcoming', false);
      break;
    default:
      break;
  }
  return state;
}

function changeLevel(state, action) {
  state.level = getLevel(state, action);
  state.board = action.board;
  state.kyes = kyes;
  state.diamondsLeft = state.level && state.level.count(entities.Diamond);
}

export function getInputMode(state) {
  return state.showGotoDialog ? 'dialog' : state.victory ? 'none' : 'game';
}

export function getLevel(state, action) {
  let level;
  if (action.type === 'LOAD_CAMPAIGN') {
    level = action.campaign.levels[0];
  } else if (action.type === 'WIN') {
    if (state.level.index < state.campaign.levels.length) {
      level = state.campaign.levels[state.level.index + 1];
    } else {
      level = null;
    }
  } else if (action.type === 'LOAD_LEVEL') {
    if (action.code) {
      level = state.campaign.levelsByCode.get(action.code.toUpperCase());
    } else {
      level = state.level;
    }
  }
  return level;
}
