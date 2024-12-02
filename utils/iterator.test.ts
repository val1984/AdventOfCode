import { describe, expect, it } from "vitest";
import { zip } from "./iterator";

describe(zip.name, () => {
  it("should zip 2 iterators of same length into an iterator of the same length", () => {
    const left = [1, 2, 3].values();
    const right = [1, 2, 3].values();
    let n = 1;
    for (const [l, r] of zip(left, right)) {
      expect(l).toBe(n);
      expect(r).toBe(n);
      n++;
    }
  });

  it("should zip 2 iterators of different length into an iterator of the shortest length", () => {
    const left = [1, 2, 3].values();
    const right = [1, 2].values();
    let n = 1;
    const zipped = zip(left, right);
    for (const [l, r] of zipped) {
      expect(l).toBe(n);
      expect(r).toBe(n);
      n++;
    }
    expect(n).toBe(3);
  });
});
