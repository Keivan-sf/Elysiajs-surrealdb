import { describe, expect, it } from "bun:test";
import { areAllPropertiesUndefined } from "./objectUtils";

describe("Object utils", () => {
  it("should return true for empty object", () => {
    let obj = {};
    expect(areAllPropertiesUndefined(obj)).toBe(true);
  });

  it("should return true for undefined properties", () => {
    let obj = { a: undefined, b: undefined };
    expect(areAllPropertiesUndefined(obj)).toBe(true);
  });

  it("should return false for defined properties", () => {
    let obj = { a: undefined, b: 12 };
    expect(areAllPropertiesUndefined(obj)).toBe(false);
  });
});
