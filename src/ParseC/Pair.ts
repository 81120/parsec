export class Pair<U, V> {
  readonly first: U;
  readonly second: V;

  constructor(first: U, second: V) {
    this.first = first;
    this.second = second;
  }

  static of<U, V>(fst: U, snd: V) {
    return new Pair<U, V>(fst, snd);
  }
}
