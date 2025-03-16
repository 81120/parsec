import {
  flatMap,
  omitLeft,
  omitRight,
  orElse,
  Pair,
  Parser,
  ParserRet,
  sepBy,
  stringParser,
  trim,
} from "../ParseC";
import { AstType, JsonAst, MkAst } from "./Ast";
import { JBool } from "./Boolean";
import { JNull } from "./Null";
import { JNumber } from "./Number";
import { JString } from "./String";

export const Json: Parser<JsonAst> = orElse(
  Parser.of(JObjectFunc),
  orElse(
    Parser.of(JArrayFunc),
    orElse(JNumber, orElse(JString, orElse(JBool, JNull)))
  )
);

function JArrayFunc(input: string): ParserRet<JsonAst> {
  const res = omitRight(
    omitLeft(
      trim(stringParser("[")),
      sepBy(Json, trim(stringParser(",")))
    ),
    trim(stringParser("]"))
  ).parse(input);

  if (res === undefined) {
    return undefined;
  }

  return Pair.of(MkAst(AstType.Array, res.first), res.second);
}

export const JArray = Parser.of(JArrayFunc);

function JObjectPairFunc(
  input: string
): ParserRet<{ key: string; value: JsonAst }> {
  let key: string = "";
  const val = flatMap(
    omitRight(trim(JString), trim(stringParser(":"))),
    (r) => {
      key = r.value as string;
      return Json;
    }
  ).parse(input);
  if (val === undefined) {
    return undefined;
  }
  return Pair.of({ key, value: val.first }, val.second);
}

export const JObjectPair = Parser.of(JObjectPairFunc);

function JObjectFunc(input: string) {
  const res = omitRight(
    omitLeft(
      trim(stringParser("{")),
      sepBy(JObjectPair, trim(stringParser(",")))
    ),
    trim(stringParser("}"))
  ).parse(input);
  if (res === undefined) {
    return undefined;
  }
  return Pair.of(
    MkAst(
      AstType.Object,
      res.first.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
      }, {} as Record<string, JsonAst>)
    ),
    res.second
  );
}

export const JObject = Parser.of(JObjectFunc);
