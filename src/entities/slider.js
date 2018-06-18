import { Thinker } from 'potato-engine';
import { Map } from 'immutable';

export default class Slider extends Thinker {
  get direction() {
    return this.attribute;
  }

  think(board) {
    board.move(this, this.direction);
  }
}
Slider.attributesBySymbol = Map({ u: 'UP', d: 'DOWN', l: 'LEFT', r: 'RIGHT' });
Slider.__name = 'Slider'; // uglify killin' me
