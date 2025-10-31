import { describe, expect, it } from "vitest";
import { estimateEta, etaRange } from "../eta";

describe("eta calculations", () => {
  it("calculates total days based on zone", () => {
    expect(estimateEta({ leadTimeDays: 7, zone: "A" })).toBe(11);
    expect(estimateEta({ leadTimeDays: 7, zone: "C" })).toBe(18);
  });

  it("provides a range around ETA", () => {
    expect(etaRange(14)).toEqual([12, 16]);
  });
});
