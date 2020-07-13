import { Entity } from 'potato-engine';
import { Seq } from 'immutable';
import { range } from 'iter-tools';

export default class Wall extends Entity {
  static __name = 'Wall';
  static attributesBySymbol = Seq.Set(range(10))
    .toKeyedSeq()
    .mapKeys(num => String(num))
    .toMap();

  get isStatic() {
    return true;
  }

  get symbol() {
    return '' + this.roundness;
  }

  get roundness() {
    return Number(this.__attribute);
  }
}
