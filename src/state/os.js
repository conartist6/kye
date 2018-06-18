import { Record, List } from 'immutable';
import { entities } from 'potato-engine';

const kyes = 3;

const State = Record({
  selectedFilename: null,
});

export default function game(state = new State(), action) {
  switch (action.type) {
    case 'SELECT_FILE':
      state = state.set('selectedFilename', action.name);
      break;
    case 'OPEN_FILE':
    case 'CLICK_DESKTOP':
      state = state.set('selectedFilename', null);
      break;
  }
  return state;
}
