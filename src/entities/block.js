import { Entity } from 'potato-engine';
import { Map } from 'immutable';

export default class Block extends Entity {
  static __name = 'Block';
  static attributesBySymbol = Map({ B: 'ROUND', b: 'SQUARE' });

  get isRound() {
    return this.__attribute;
  }

  get roundness() {
    return this.__attribute === 'ROUND' ? 0 : 5;
  }

  get frequency() {
    return 1;
  }
}
