import { describe, expect, test } from "bun:test";
import { computeIntersection, range } from "./05";

describe(computeIntersection.name, () => {
  test("range1 is strictly before range2", () => {
    const actual = computeIntersection(range(1, 5), range(7, 12));
    expect(actual).toBeUndefined();
  });

  test("range1 is strictly after range2", () => {
    const actual = computeIntersection(range(6, 4), range(1, 4));
    expect(actual).toBeUndefined();
  });

  test("range1 ends exactly where range2 starts", () => {
    const actual = computeIntersection(range(1, 5), range(6, 4));
    expect(actual).toBeUndefined();
  })

  test("range2 ends exactly where range1 starts", () => {
    const actual = computeIntersection(range(1, 5), range(0, 1));
    expect(actual).toBeUndefined();
  })

  test("range1 starts before range2 but they overlap", () => {
    const actual = computeIntersection(range(1, 5), range(5, 4));
    expect(actual).toEqual(range(5, 1));
  });

  test("range1 starts after range2 but they overlap", () => {
    const actual = computeIntersection(range(7, 5), range(5, 4));
    expect(actual).toEqual(range(7, 2));
  });

  test('range1 is fully included in range2', () => {
    const actual = computeIntersection(range(9, 2), range(7, 5));
    expect(actual).toEqual(range(9, 2));
  });

  test('range2 is fully included in range1', () => {
    const actual = computeIntersection(range(7, 5), range(9, 2));
    expect(actual).toEqual(range(9, 2));
  });

  test('range1 is empty', () => {
    const actual = computeIntersection(range(10, 0), range(9, 2));
    expect(actual).toBeUndefined();
  });

  test('range2 is empty', () => {
    const actual = computeIntersection(range(5, 4), range(7, 0));
    expect(actual).toBeUndefined();
  });
});
