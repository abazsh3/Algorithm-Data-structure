function search(array: number[], value: number): number | undefined {
  const middleIndex = Math.floor(array.length / 2);
  if (array[middleIndex] === value) return array[middleIndex];
  if (array.length === 1) return undefined;

  if (array[middleIndex] > value) {
    return search(array.slice(0, middleIndex), value);
  } else {
    return search(array.slice(middleIndex), value);
  }
}
