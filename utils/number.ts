function isPrime(value: number, primes: Iterable<number> = primeGenerator()) {
  const maxDivider = Math.sqrt(value);
  for (const prime of primes) {
    if (prime > maxDivider) {
      return true;
    } else if (value % prime === 0) {
      return false;
    }
  }
}

function* primeGenerator() {
  const primes = [2];
  yield 2;
  let nextCandidate = 3;
  while (true) {
    yield nextCandidate;
    primes.push(nextCandidate);
    nextCandidate += 2;
    while (!isPrime(nextCandidate, primes)) {
      nextCandidate += 2;
    }
  }
}

export function computePrimeFactors(value: number) {
  if (isPrime(value)) {
    return { [value]: 1 };
  }
  let remainder = value;
  let primes: Record<number, number> = {};
  let primeGen = primeGenerator();
  while (remainder !== 1) {
    const prime = primeGen.next().value!;
    while (remainder % prime === 0) {
      remainder = remainder / prime;
      primes[prime] ??= 0;
      primes[prime]++;
    }
  }
  return primes;
}

export function computeLcm(numbers: number[]) {
  const commonFactors = numbers.map(computePrimeFactors).reduce(
    (acc: Record<string, number>, primes) => {
      Object.entries(primes).forEach(([prime, count]) => {
        acc[prime] = Math.max(acc[prime] ?? 0, count);
      });
      return acc;
    },
    {}
  );
  return Object.entries(commonFactors).reduce(
    (product, [prime, count]) => product * Number(prime) ** count,
    1
  );
}