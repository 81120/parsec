import { Pair, Parser, fmap, trim } from "../ParseC";
import { AstType, MkAst } from "./Ast";

export const JNumber = fmap(
  (s: string) => MkAst(AstType.Number, Number(s)),
  trim(
    Parser.of((input: string) => {
      const ret = /^(-?[0-9]+(\.[0-9]+)?)/.exec(input);
      if (ret === null) {
        return undefined;
      }
      const str = ret[0];
      return Pair.of(str, input.replace(str, ""));
    })
  )
);
