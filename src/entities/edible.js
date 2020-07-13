import { Field } from 'potato-engine';
import { Map } from 'immutable';

export default class Edible extends Field {
  static __name = 'Edible';
  static attributesBySymbol = Map({ e: null });

  canEnter(board, target) {
    const { entities } = this;
    return target instanceof entities.Player;
  }

  enter(board, target) {
    this.destroy();
  }
}
