import { expect, test } from "bun:test";
import FileSystem from ".";

test("Create and read a directory", () => {
  const system = new FileSystem();

  system.mkdir("/dir/foo/bar");
  system.mkdir("/dir/foo");
  system.mkdir("/baz");

  expect(system.ls("/")).toEqual(["baz", "dir"]);

  expect(system.ls("/dir")).toEqual(["foo"]);
});

test("Create and read a file", () => {
  const system = new FileSystem();

  system.mkdir("/dir/foo/bar");

  system.addContentToFile("/dir/foo/bar/file", "hello");

  expect(system.readContentFromFile("/dir/foo/bar/file")).toBe("hello");
});

test("Update a file and appends content to the file", () => {
  const system = new FileSystem();

  system.mkdir("/dir/foo");

  system.addContentToFile("/dir/foo/file", "hello");

  expect(system.readContentFromFile("/dir/foo/file")).toBe("hello");

  system.addContentToFile("/dir/foo/file", "meh");

  expect(system.readContentFromFile("/dir/foo/file")).toBe("hellomeh");
});

test("Leetcode test cases", () => {
  const s = new FileSystem();

  s.mkdir("/goowmfn");

  expect(s.ls("/goowmfn")).toEqual([]);
  expect(s.ls("/")).toEqual(["goowmfn"]);
  s.mkdir("/z");
  expect(s.ls("/")).toEqual(["goowmfn", "z"]);
  expect(s.ls("/")).toEqual(["goowmfn", "z"]);

  s.addContentToFile("/goowmfn/c", "shetopcy")
  expect(s.ls("/z")).toEqual([]);
  expect(s.ls("/goowmfn/c")).toEqual(["c"]);
  expect(s.ls("/goowmfn")).toEqual(["c"]);
});
