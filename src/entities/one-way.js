import { Field, directions } from 'potato-engine';
import { Map } from 'immutable';

const { flip } = directions;

export default class OneWay extends Field {
  get direction() {
    return this.attribute;
  }

  canEnter(board, targetEntity, direction) {
    return flip(direction) === this.direction ? super.canEnter(...arguments) : false;
  }
}
OneWay.attributesBySymbol = Map({ g: 'LEFT', i: 'UP', f: 'RIGHT', h: 'DOWN' });
OneWay.__name = 'OneWay'; // uglify killin' me
