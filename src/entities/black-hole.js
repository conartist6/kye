import { Field } from 'potato-engine';
import { Map } from 'immutable';

export default class BlackHole extends Field {
  static __name = 'BlackHole';
  static attributesBySymbol = Map({ H: 0 });

  enter(board, entity) {
    entity.destroy();
    const { WhiteHole } = board.entities;
    this.replace(new WhiteHole(this.coords));
  }
}
