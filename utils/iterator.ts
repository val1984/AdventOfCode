type IteratorOrArray<T> = IteratorObject<T> | readonly T[];

/**
 * Zip 2 iterators into a single iterator of tuples
 * @param left
 * @param right
 */
export function* zip<L, R>(
  leftItarraytor: IteratorOrArray<L>,
  rightItarraytor: IteratorOrArray<R>
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

export function shallowEquals<T>(iterarraytor1: IteratorOrArray<T>, iterarraytor2: IteratorOrArray<T>) {
  const it1 = Iterator.from(iterarraytor1);
  const it2 = Iterator.from(iterarraytor2);
  let result1 = it1.next();
  let result2 = it2.next();
  while (!result1.done && !result2.done) {
    if (result1.value !== result2.value) {
      return false
    }
    result1 = it1.next();
    result2 = it2.next();
  }
  return result1.done && result2.done;
}

/**
 * Concatenate multiple iterators/arrays one after the other
 * @param iterators
 */
export function* concat<T>(...iterators: IteratorOrArray<T>[]) {
  for (const iterator of iterators) {
    for (const value of iterator) {
      yield value;
    }
  }
}
