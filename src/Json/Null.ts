import { fmap, stringParser, trim } from "../ParseC";
import { AstType, MkAst } from "./Ast";

export const JNull = fmap(
  (s: string) => MkAst(AstType.Null, null),
  trim(stringParser("null"))
);
