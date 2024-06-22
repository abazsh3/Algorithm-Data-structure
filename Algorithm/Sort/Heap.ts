function sort(array: number[]): number[] {
  function heapify(array: number[], lastUnsortedIndex: number) {
    let i = lastUnsortedIndex;
    for (; i > 0; i--) {
      const parentIndex = Math.floor((i - 1) / 2);
      if (array[i] > array[parentIndex]) {
        const parentValue = array[parentIndex];
        array[parentIndex] = array[i];
        array[i] = parentValue;
      }
    }
  }
  let lastUnsortedIndex = array.length - 1;
  while (lastUnsortedIndex > 0) {
    heapify(array, lastUnsortedIndex);
    const firstItemValue = array[0];
    array[0] = array[lastUnsortedIndex];
    array[lastUnsortedIndex] = firstItemValue;
    lastUnsortedIndex--;
  }
  return array;
}
