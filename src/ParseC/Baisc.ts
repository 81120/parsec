import { Pair } from "./Pair";
import { Parser } from "./Types";

export const pure = <U>(u: U): Parser<U> =>
  Parser.of((input: string) => {
    return Pair.of(u, input);
  });

export const space: Parser<string> = Parser.of((input: string) => {
  const reg = /^[ \t\r\n]+/;
  const ret = input.match(reg);
  if (ret === null) {
    return Pair.of("", input);
  }
  return Pair.of(ret[0], input.replace(reg, ""));
});

export const stringParser = (s: string): Parser<string> =>
  Parser.of((input: string) => {
    if (input.startsWith(s)) {
      return Pair.of(s, input.replace(s, ""));
    }
    return undefined;
  });
