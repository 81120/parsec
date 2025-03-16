import { space } from "./Baisc";
import { omitLeft, omitRight } from "./Functor";
import { Pair } from "./Pair";
import { Parser } from "./Types";

export const satisfy = (f: (str: string) => boolean): Parser<string> =>
  Parser.of((input: string) => {
    if (f(input[0])) {
      return Pair.of(input[0], input.slice(1));
    }
    return undefined;
  });

export const zeroOrMore = <U>(p: Parser<U>): Parser<U[]> =>
  Parser.of((input: string) => {
    const ret: U[] = [];
    let s = input;
    while (true) {
      const res = p.parse(s);
      if (res === undefined) {
        break;
      }
      ret.push(res.first);
      s = res.second;
    }
    return Pair.of(ret, s);
  });

export const oneOrMore = <U>(p: Parser<U>): Parser<U[]> =>
  Parser.of((input: string) => {
    const r = zeroOrMore(p).parse(input);
    if (r?.first.length === 0) {
      return undefined;
    }
    return r;
  });

export const sepBy = <U, V>(p: Parser<U>, sep: Parser<V>): Parser<U[]> =>
  Parser.of((input: string) => {
    const ret: U[] = [];
    let s = input;
    while (true) {
      const res = p.parse(s);
      if (res === undefined) {
        break;
      }
      ret.push(res.first);
      s = res.second;
      const sepRes = sep.parse(s);
      if (sepRes === undefined) {
        break;
      }
      s = sepRes.second;
    }
    return Pair.of(ret, s);
  });

export const sepBy1 = <U, V>(p: Parser<U>, sep: Parser<V>): Parser<U[]> =>
  Parser.of((input: string) => {
    const r = sepBy(p, sep).parse(input);
    if (r?.first.length === 0) {
      return undefined;
    }
    return r;
  });

export const trim = <U>(p: Parser<U>): Parser<U> =>
  omitRight(omitLeft(space, p), space);
