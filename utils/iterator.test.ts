import { describe, expect, it } from "vitest";
import { concat, zip } from "./iterator";

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

  it("should zip 2 arrays of same length into an iterator of the same length", () => {
    const left = [1, 2, 3];
    const right = [1, 2, 3];
    let n = 1;
    const zipped = zip(left, right);
    for (const [l, r] of zipped) {
      expect(l).toBe(n);
      expect(r).toBe(n);
      n++;
    }
  });

  it("should zip 1 array and 1 iterator of same length into an iterator of the same length", () => {
    const left = [1, 2, 3];
    const right = [1, 2, 3].values();
    let n = 1;
    const zipped = zip(left, right);
    for (const [l, r] of zipped) {
      expect(l).toBe(n);
      expect(r).toBe(n);
      n++;
    }
  });
});

describe(concat.name, () => {
  it('should concatenate multiple iterators/arrays in a single iterator', () => {
    const it1 = [1, 2].values();
    const arr2 = [3,4,5];
    const it3 = [6,7,8,9].values();
    const arr4 = [10];
    const concatenated = concat(it1, arr2, it3, arr4);
    let n = 1;
    for (const x of concatenated) {
      expect(x).toBe(n++);
    }
  })
});
