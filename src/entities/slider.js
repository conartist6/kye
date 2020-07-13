import { Thinker } from 'potato-engine';
import { Map } from 'immutable';

export default class Slider extends Thinker {
  static __name = 'Slider';
  static attributesBySymbol = Map({ u: 'UP', d: 'DOWN', l: 'LEFT', r: 'RIGHT' });

  get direction() {
    return this.attribute;
  }

  think(board) {
    board.move(this, this.direction);
  }
}
