import { Field, directions } from 'potato-engine';
import { Map } from 'immutable';

const { flip } = directions;

export default class OneWay extends Field {
  static __name = 'OneWay';
  static attributesBySymbol = Map({ g: 'LEFT', i: 'UP', f: 'RIGHT', h: 'DOWN' });

  get direction() {
    return this.attribute;
  }

  canEnter(board, targetEntity, direction) {
    return flip(direction) === this.direction ? super.canEnter(...arguments) : false;
  }
}
