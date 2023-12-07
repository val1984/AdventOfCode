import { describe, expect, test } from "bun:test";
import { part1CompareHands, part2CompareHands, part2RankCards } from "./07";

describe(part1CompareHands.name, () => {
  test("hands with same weight", () => {
    const actual = part1CompareHands("T55J5", "QQQJA");
    expect(actual).toBeNegative();
  });

  test("hand1 is heavier than hand2", () => {
    const actual = part1CompareHands("T55J5", "KK677");
    expect(actual).toBePositive();
  });

  test("hand1 is lighter than hand2", () => {
    const actual = part1CompareHands("KTJJT", "QQQJA");
    expect(actual).toBeNegative();
  });
});

type TestCase = [hand1: string, hand2: string, isPositive: boolean];

describe(part2CompareHands.name, () => {
  const testCases: TestCase[] = [["QQQQ2", "JKKK2", true]];
  testCases.forEach(([hand1, hand2, isPositive]) =>
    test("hand1 is heavier than hand2", () => {
      const actual = part2CompareHands(hand1, hand2);
      if (isPositive) {
        expect(actual).toBePositive();
      } else {
        expect(actual).toBeNegative();
      }
    })
  );

  test("hand2 is heavier than hand1", () => {
    const actual = part2CompareHands("QQQJA", "KTJJT");
    expect(actual).toBeNegative();
  });
});
