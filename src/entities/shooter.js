import { Thinker, directions } from 'potato-engine';
import { Map } from 'immutable';

export default class Shooter extends Thinker {
  constructor(coords, attribute, ...args) {
    super(coords, 'UP', ...args);
    this._timer = 0;
  }

  get frequency() {
    return 7;
  }

  get content() {
    return 'F';
  }

  get direction() {
    return this.__attribute;
  }

  get projectileClass() {
    return this.entities.Slider;
  }

  makeProjectile(dimensions) {
    const Projectile = this.projectileClass;
    return new Projectile(
      directions.getCoordsInDirection(dimensions, this.coords, this.direction),
      this.direction,
    );
  }

  think(board) {
    this.__attribute = directions.rightOf(this.__attribute);
    this._timer++;

    const { Slider } = this.entities;
    const [x, y] = this.coords;
    const target = board.at(this.coords, this.direction);

    if (this._timer > y && board.inBoard(this.coords, this.direction) && target == null) {
      board.create(this.makeProjectile(board.dimensions));
      this._timer = 0;
    }
  }
}
Shooter.attributesBySymbol = Map({ A: 'UP' });
Shooter.__name = 'Shooter'; // uglify killin' me
