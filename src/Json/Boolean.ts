import { fmap, orElse, stringParser, trim } from "../ParseC";
import { AstType, MkAst } from "./Ast";

export const JTrue = fmap(
  (s: string) => MkAst(AstType.Boolean, true),
  trim(stringParser("true"))
);

export const JFalse = fmap(
  (s: string) => MkAst(AstType.Boolean, false),
  trim(stringParser("false"))
);

export const JBool = orElse(JTrue, JFalse);
