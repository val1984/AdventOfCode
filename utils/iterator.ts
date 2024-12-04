/**
 * Zip 2 iterators into a single iterator of tuples
 * @param left
 * @param right
 */
export function* zip<L, R>(
  leftItarraytor: Iterator<L> | readonly L[],
  rightItarraytor: Iterator<R> | readonly R[]
): IteratorObject<[L, R]> {
  const leftIt = Iterator.from(leftItarraytor);
  const rightIt = Iterator.from(rightItarraytor);
  let left = leftIt.next();
  let right = rightIt.next();
  while (!left.done && !right.done) {
    yield [left.value, right.value];
    left = leftIt.next();
    right = rightIt.next();
  }
  return;
}

/**
 * Concatenate multiple iterators/arrays one after the other
 * @param iterators
 */
export function* concat<T>(...iterators: (IteratorObject<T> | readonly T[])[]) {
  for (const iterator of iterators) {
    for (const value of iterator) {
      yield value;
    }
  }
}
