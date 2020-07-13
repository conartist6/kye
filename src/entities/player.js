import { Player as BasePlayer } from 'potato-engine';
import { Map } from 'immutable';

export default class Player extends BasePlayer {
  static __name = 'Player';
  static attributesBySymbol = Map({ K: null });

  get electroMagnet() {
    return true;
  }
}
