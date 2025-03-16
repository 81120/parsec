import { fmap, Pair, Parser, trim } from "../ParseC";
import { AstType, MkAst } from "./Ast";

export const JString = fmap(
  (s) => MkAst(AstType.String, s),
  trim(
    Parser.of((input: string) => {
      const strReg = /^"((?:\\"|[^"])*)"/;
      const rt = input.match(strReg);
      if (rt === null) {
        return undefined;
      }
      const str = rt[0];
      return Pair.of(
        str.substring(1, str.length - 1),
        input.replace(strReg, "")
      );
    })
  )
);
