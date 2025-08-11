import { expect, test } from "bun:test";
import jsonParse from "./jsonParse";

test("parsing just like json parse for simple case", () => {
  let str = `{ "hi": "mom" }`;
  expect(jsonParse(str)).toEqual(JSON.parse(str));
});
