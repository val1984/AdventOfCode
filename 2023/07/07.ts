import { day07Input } from "./07data.ts";

function* makeMapEntries(input: string) {
  let i = 0;
  while (i < input.length) {
    yield [input[i], i++];
  }
}

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
const part1CardRank = "AKQJT98765432";
const part1CardRankMap = Object.fromEntries(makeMapEntries(part1CardRank));

const enum Score {
  Five = 0,
  Four = 1,
  FullHouse = 2,
  Three = 3,
  TwoPairs = 4,
  Pair = 5,
  Nothing = 6,
}

export function countCards(hand: string): Record<Card, number> {
  return (Array.from(hand) as Card[]).reduce((acc, card) => {
    acc[card] ??= 0;
    acc[card]++;
    return acc;
  }, {} as Record<Card, number>);
}

export function part1RankCards(cardsByCount: Record<Card, number>) {
  const cardsByCountArray = Object.entries(cardsByCount);
  switch (cardsByCountArray.length) {
    case 1:
      return Score.Five;
    case 2:
      return cardsByCountArray.some(([, count]) => count === 4)
        ? Score.Four
        : Score.FullHouse;
    case 3:
      return cardsByCountArray.some(([, count]) => count === 3)
        ? Score.Three
        : Score.TwoPairs;
    case 4:
      return Score.Pair;
    default:
      return Score.Nothing;
  }
}

export function part1CompareHands(hand1: string, hand2: string): number {
  const hand1CardsCount = countCards(hand1);
  const hand2CardsCount = countCards(hand2);
  const comparedHands =
    part1RankCards(hand2CardsCount) - part1RankCards(hand1CardsCount);
  if (comparedHands !== 0) {
    return comparedHands;
  }
  for (let i = 0; i < 5; i++) {
    const cardOrder = part1CardRankMap[hand2[i]] - part1CardRankMap[hand1[i]];
    if (cardOrder !== 0) {
      return cardOrder;
    }
  }
  return 0;
}

function part1(input: string) {
  const handsAndBets = input.split("\n").map((line) => line.split(" "));
  const sortedHandsAndBets = handsAndBets.sort(([hand1], [hand2]) =>
    part1CompareHands(hand1, hand2)
  );
  return sortedHandsAndBets.reduce((acc, [, bet], index) => {
    return acc + Number(bet) * (index + 1);
  }, 0);
}

console.log("Part 1", part1(day07Input));

const part2CardRank = "AKQT98765432J";
const part2CardRankMap = Object.fromEntries(makeMapEntries(part2CardRank));

export function part2RankCards({
  J: jokersCount = 0,
  ...otherCards
}: Record<Card, number>): number {
  const cardsByCountArray = Object.entries(otherCards);
  switch (cardsByCountArray.length) {
    case 0:
    case 1:
      return Score.Five;
    case 2:
      switch (jokersCount) {
        case 3:
        case 2:
          return Score.Four;
        case 1:
          return cardsByCountArray.some(([, count]) => count === 3)
            ? Score.Four
            : Score.FullHouse;
        default:
          return cardsByCountArray.some(([, count]) => count === 4)
            ? Score.Four
            : Score.FullHouse;
      }
    case 3:
      switch (jokersCount) {
        case 2:
        case 1:
          return Score.Three;
        default:
          return cardsByCountArray.some(([, count]) => count === 3)
            ? Score.Three
            : Score.TwoPairs;
      }
    case 4:
      return Score.Pair;
    default:
      return Score.Nothing;
  }
}

export function part2CompareHands(hand1: string, hand2: string): number {
  const hand1CardsCount = countCards(hand1);
  const hand2CardsCount = countCards(hand2);
  const comparedHands =
    part2RankCards(hand2CardsCount) - part2RankCards(hand1CardsCount);
  if (comparedHands !== 0) {
    return comparedHands;
  }
  for (let i = 0; i < 5; i++) {
    const cardOrder = part2CardRankMap[hand2[i]] - part2CardRankMap[hand1[i]];
    if (cardOrder !== 0) {
      return cardOrder;
    }
  }
  return 0;
}

function part2(input: string) {
  const handsAndBets = input.split("\n").map((line) => line.split(" "));
  const sortedHandsAndBets = handsAndBets.sort(([hand1], [hand2]) =>
    part2CompareHands(hand1, hand2)
  );
  return sortedHandsAndBets.reduce((acc, [, bet], index) => {
    return acc + Number(bet) * (index + 1);
  }, 0);
}

console.log("Part 2", part2(day07Input));
