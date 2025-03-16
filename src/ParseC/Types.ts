import { Pair } from "./Pair";

export type ParserRet<T> = Pair<T, string> | undefined;

export type ParserFunc<T> = (input: string) => ParserRet<T>;

export class Parser<T> {
  private parserFunc: ParserFunc<T>;

  constructor(parserFunc: ParserFunc<T>) {
    this.parserFunc = parserFunc;
  }

  parse(input: string): ParserRet<T> {
    return this.parserFunc(input);
  }

  static of<T>(parserFunc: ParserFunc<T>) {
    return new Parser<T>(parserFunc);
  }
}
