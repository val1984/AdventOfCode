import { day07Demo, day07Input } from "./07data";

type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";
const cardRank = "AKQJT98765432";
const makeMapEntries = function* (
  input: string
): Generator<(string | number)[], void, unknown> {
  let i = 0;
  while (i < input.length) {
    yield [input[i], i++];
  }
};
const cardRankMap = Object.fromEntries(makeMapEntries(cardRank));

export function countCards(hand: string): Record<Card, number> {
  return (Array.from(hand) as Card[]).reduce((acc, card) => {
    acc[card] ??= 0;
    acc[card]++;
    return acc;
  }, {} as Record<Card, number>);
}

export function rankCards(cardsByCount: Record<Card, number>) {
  const cardsByCountArray = Object.entries(cardsByCount);
  switch (cardsByCountArray.length) {
    case 1:
      return 0;
    case 2:
      return cardsByCountArray.some(([, count]) => count === 4) ? 1 : 2;
    case 3:
      return cardsByCountArray.some(([, count]) => count === 3) ? 3 : 4;
    case 4:
      return 5;
    default:
      return 6;
  }
}

export function compareHands(hand1: string, hand2: string): number {
  cardRankMap[hand2[0]] - cardRankMap[hand1[0]];
  const hand1CardsCount = countCards(hand1);
  const hand2CardsCount = countCards(hand2);
  const comparedHands = rankCards(hand2CardsCount) - rankCards(hand1CardsCount);
  if (comparedHands !== 0) {
    return comparedHands;
  }
  for (let i = 0; i < 5; i++) {
    const cardOrder = cardRankMap[hand2[i]] - cardRankMap[hand1[i]]
    if (cardOrder !== 0) {
      return cardOrder;
    }
  }
  return 0;
}

function part1(input: string) {
  const handsAndBets = input.split("\n").map((line) => line.split(" "));
  const sortedHandsAndBets = handsAndBets.sort(([hand1], [hand2]) =>
    compareHands(hand1, hand2)
  );
  return sortedHandsAndBets.reduce((acc, [, bet], index) => {
    return acc + Number(bet) * (index + 1);
  }, 0);
}

console.log("Part 1", part1(day07Input));

function part2(input: string) {}

console.log("Part 2", part2(day07Demo));
