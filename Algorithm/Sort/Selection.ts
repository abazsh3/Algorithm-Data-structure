function sort(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    let minValue = array[i];
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < minValue) {
        minValue = array[j];
        minIndex = j;
      }
    }
    array[minIndex] = array[i];
    array[i] = minValue;
  }
}
