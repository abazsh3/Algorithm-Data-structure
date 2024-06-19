function sort(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    const selectedValue = array[i];
    for (let j = i - 1; j >= 0; j--) {
      if (selectedValue < array[j]) {
        array[j + 1] = array[j];
        array[j] = selectedValue;
      }
    }
  }
}
