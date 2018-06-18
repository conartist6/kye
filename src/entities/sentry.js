import { Thinker, directions } from 'potato-engine';
import { Map } from 'immutable';

const { flip } = directions;

export default class Sentry extends Thinker {
  think(board) {
    const canMove = board.move(this, this.direction);
    if (!canMove) {
      this.replace(flip(this.direction));
    }
  }

  interact(board, targetEntity, direction) {
    board.shove(this, direction);
    return true;
  }

  get frequency() {
    return 5;
  }

  get direction() {
    return this.__attribute;
  }
}
Sentry.attributesBySymbol = Map({ U: 'UP', D: 'DOWN', L: 'LEFT', R: 'RIGHT' });
Sentry.__name = 'Sentry'; // uglify killin' me
