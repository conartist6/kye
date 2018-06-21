import { Field } from 'potato-engine';
import { Map } from 'immutable';

export default class Edible extends Field {
  canEnter(board, target) {
    const { entities } = this;
    return target instanceof entities.Player;
  }

  enter(board, target) {
    this.destroy();
  }
}
Edible.attributesBySymbol = Map({ e: null });
Edible.__name = 'Edible'; // uglify killin' me
