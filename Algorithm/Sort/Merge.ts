function sort(array: number[]): number[] {
  if (array.length < 2) {
    return array;
  }
  const middlePoint = Math.ceil(array.length / 2);
  const left = sort(array.slice(0, middlePoint));
  const right = sort(array.slice(middlePoint));

  return Array.from({ length: array.length }, () => {
    if (!left.length || left[0] > right[0]) {
      return right.shift();
    } else if (!right.length || left[0] <= right[0]) {
      return left.shift();
    }
  });
}
