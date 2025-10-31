import { describe, expect, it } from "vitest";
import { cmToMm, inchToMm, mmToCm, mmToInch } from "../units";

describe("unit conversions", () => {
  it("converts mm to cm", () => {
    expect(mmToCm(1230)).toBe(123);
  });

  it("converts mm to inch", () => {
    expect(mmToInch(254)).toBe(10);
  });

  it("converts cm to mm", () => {
    expect(cmToMm(123.4)).toBe(1234);
  });

  it("converts inch to mm", () => {
    expect(inchToMm(10)).toBe(254);
  });
});
