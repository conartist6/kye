import Edible from './edible';
import { Map } from 'immutable';

export default class Diamond extends Edible {
  static __name = 'Diamond';
  static attributesBySymbol = Map({ '*': null });

  get twinkles() {
    return true;
  }

  destroy() {
    const { board } = this;
    board.once('tick', () => {
      board.emit('progress', this);
      if (board.getState().diamondsLeft === 0) {
        board.emit('win');
      }
    });
    super.destroy();
  }
}
