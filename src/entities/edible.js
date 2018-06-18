import { Field } from 'potato-engine';
import { Map } from 'immutable';

export default class Edible extends Field {
  enter(board, target) {
    const { entities } = this;
    if (target instanceof entities.Player) {
      this.destroy();
      return false;
    }
    return true;
  }
}
Edible.attributesBySymbol = Map({ e: null });
Edible.__name = 'Edible'; // uglify killin' me
