export enum AstType {
  Number,
  String,
  Boolean,
  Null,
  Array,
  Object,
}

export type JsonAst =
  | { type: AstType.Number; value: number }
  | { type: AstType.String; value: string }
  | { type: AstType.Boolean; value: boolean }
  | { type: AstType.Null; value: null }
  | { type: AstType.Array; value: JsonAst[] }
  | { type: AstType.Object; value: { [key: string]: JsonAst } };

export const MkAst = (type: AstType, value: any): JsonAst => ({
  type,
  value,
});
