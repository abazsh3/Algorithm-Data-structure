function sort(array: number[]) {
  let lastUnsortedIndex = array.length - 1;
  while (lastUnsortedIndex > 0) {
    for (let index = 0; index < lastUnsortedIndex; index++) {
      let current = array[index];
      let next = array[index + 1];

      if (current > next) {
        array[index + 1] = current;
        array[index] = next;
      }

      if (index === lastUnsortedIndex - 1) {
        index = 0;
        lastUnsortedIndex--;
      }
    }
  }
  return array;
}
