import { Field, directions } from 'potato-engine';
import { Map } from 'immutable';

const { flip } = directions;

export default class OneWay extends Field {
  get direction() {
    return this.attribute;
  }

  enter(board, targetEntity, direction) {
    return targetEntity instanceof board.entities.Player
      ? flip(direction) !== this.direction
      : true;
  }
}
OneWay.attributesBySymbol = Map({ g: 'LEFT', i: 'UP', f: 'RIGHT', h: 'DOWN' });
OneWay.__name = 'OneWay'; // uglify killin' me
