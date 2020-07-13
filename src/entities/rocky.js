import Slider from './slider';
import { Map } from 'immutable';

export default class Rocky extends Slider {
  static __name = 'Rocky';
  static attributesBySymbol = Map({ '<': 'LEFT', '^': 'UP', '>': 'RIGHT', v: 'DOWN' });

  get roundness() {
    return 0;
  }
}
