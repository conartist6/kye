import { Magnet as MagnetBase } from 'potato-engine';
import { Map } from 'immutable';

export default class Magnet extends MagnetBase {
  static __name = 'Magnet';
  static attributesBySymbol = Map({ S: 'HORIZONTAL', s: 'VERTICAL' });

  get frequency() {
    return 1;
  }

  get orientation() {
    return this.__attribute;
  }
}
