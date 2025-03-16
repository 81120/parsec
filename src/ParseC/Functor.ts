import { Pair } from "./Pair";
import { Parser, type ParserRet } from "./Types";

export const fmap = <U, V>(f: (a: U) => V, p: Parser<U>): Parser<V> =>
  Parser.of((input: string) => {
    const ret = p.parse(input);
    if (ret === undefined) {
      return undefined;
    }
    return Pair.of(f(ret.first), ret.second);
  });

export const flatMap = <U, V>(
  p: Parser<U>,
  f: (a: U) => Parser<V>
): Parser<V> =>
  Parser.of((input: string) => {
    const ret = p.parse(input);
    if (ret === undefined) {
      return undefined;
    }
    return f(ret.first).parse(ret.second);
  });

export const omitLeft = <U, V>(
  pLeft: Parser<U>,
  pRight: Parser<V>
): Parser<V> => flatMap(pLeft, () => pRight);

export const omitRight = <U, V>(
  pLeft: Parser<U>,
  pRight: Parser<V>
): Parser<U> =>
  flatMap(pLeft, (a) =>
    Parser.of((input: string) => {
      const res = pRight.parse(input);
      if (res === undefined) {
        return undefined;
      }
      return Pair.of(a, res.second);
    })
  );

export const orElse = <U, V>(
  pLeft: Parser<U>,
  pRight: Parser<V>
): Parser<U | V> =>
  Parser.of((input: string) => {
    const ret = pLeft.parse(input);
    if (ret !== undefined) {
      return ret as ParserRet<U | V>;
    }
    return pRight.parse(input);
  });
