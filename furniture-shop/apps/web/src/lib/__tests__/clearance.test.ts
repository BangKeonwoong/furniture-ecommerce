import { describe, expect, it } from "vitest";
import { largestFace, passesClearance } from "../clearance";

describe("clearance utilities", () => {
  it("computes the largest face", () => {
    expect(largestFace({ width: 200, depth: 80, height: 90 })).toEqual({ width: 200, height: 90 });
  });

  it("determines clearance", () => {
    expect(
      passesClearance({
        doorWidth: 210,
        doorHeight: 210,
        box: { width: 200, depth: 90, height: 80 }
      })
    ).toBe(true);

    expect(
      passesClearance({
        doorWidth: 190,
        doorHeight: 200,
        box: { width: 200, depth: 90, height: 80 }
      })
    ).toBe(false);
  });
});
