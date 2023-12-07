import { describe, expect, test } from "bun:test";
import { compareHands } from "./07";

describe(compareHands.name, () => {
  test("hands with same weight", () => {
    const actual = compareHands("T55J5", "QQQJA");
    expect(actual).toBeNegative();
  });

  test("hand1 is heavier than hand2", () => {
    const actual = compareHands("T55J5", "KK677");
    expect(actual).toBePositive();
  });

  test("hand1 is lighter than hand2", () => {
    const actual = compareHands("KTJJT", "QQQJA");
    expect(actual).toBeNegative();
  });
});
