import Shooter from './shooter';
import { Map } from 'immutable';

export default class RockyShooter extends Shooter {
  static __name = 'RockyShooter';
  static attributesBySymbol = Map({ F: null });

  get content() {
    return 'F';
  }

  get projectileClass() {
    return this.entities.Rocky;
  }
}
