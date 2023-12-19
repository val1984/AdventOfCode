import { day04Inputs } from "./04data.ts";

function computePoints(cards: string[]) {
  return cards.map((line) => {
    const [winningCards, drawCards] = line.split(" | ");
    const winning = winningCards.trim().split(/\s+/);
    const draws = drawCards.trim().split(/\s+/);
    const { length: successDraws } = draws.filter((draw) =>
      winning.includes(draw)
    );
    return successDraws;
  });
}

function part1(cards: string[]) {
  const successes = computePoints(cards);
  return successes.reduce(
    (acc, successes) => acc + (successes === 0 ? 0 : 2 ** (successes - 1)),
    0
  );
}

console.log("Part 1", part1(day04Inputs));

function part2(cards: string[]) {
  const successes = computePoints(cards);
  const numberOfCards: number[] = [];

  successes.forEach((success, currentCardPosition) => {
    numberOfCards[currentCardPosition] ??= 0;
    numberOfCards[currentCardPosition]++;
    for (
      let pos = currentCardPosition;
      pos < currentCardPosition + success;
      pos++
    ) {
      numberOfCards[pos + 1] ??= 0;
      numberOfCards[pos + 1] += numberOfCards[currentCardPosition];
    }
  });

  return successes.reduce(
    (acc, _success, count) => acc + numberOfCards[count],
    0
  );
}

console.log("Part 2", part2(day04Inputs));
