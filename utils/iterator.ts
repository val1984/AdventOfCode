/**
 * Zip 2 arrays into a single iterator of tuples
 * @param leftIt 
 * @param rightIt 
 */
export function* zip<L, R>(leftIt: Iterator<L>, rightIt: Iterator<R>): IteratorObject<[L, R]> {
  let left = leftIt.next();
  let right = rightIt.next();
  while (!left.done && !right.done) {
    yield [left.value, right.value];
    left = leftIt.next();
    right = rightIt.next();
  }
  return;
}
