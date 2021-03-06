import { Interactor, directions } from 'potato-engine';
import { Map } from 'immutable';

const { rightOf, leftOf } = directions;

export default class Turner extends Interactor {
  static __name = 'Turner';
  static attributesBySymbol = Map({ c: 'ANTICLOCKWISE', a: 'CLOCKWISE' });

  react(board, targetEntity, direction) {
    const { coords } = this;
    const sourceEntity = board.at(coords, direction);
    if (sourceEntity.attribute === sourceEntity.direction) {
      const transform = this.turn === 'ANTICLOCKWISE' ? leftOf : rightOf;
      sourceEntity.replace(transform(sourceEntity.direction));
    }
  }

  get turn() {
    return this.__attribute;
  }

  get content() {
    return this.turn === 'ANTICLOCKWISE' ? 'a' : 'c';
  }
}
