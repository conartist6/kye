import { Player as BasePlayer } from 'potato-engine';
import { Map } from 'immutable';

export default class Player extends BasePlayer {
  get electroMagnet() {
    return true;
  }
}
Player.attributesBySymbol = Map({ K: null });
Player.__name = 'Player'; // uglify killin' me
