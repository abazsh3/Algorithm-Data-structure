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

function searchIndex(array: number[], value: number): number | undefined {
  function searchByLimits(start: number, end: number): number | undefined {
    const middleIndex = Math.ceil((end - start) / 2) + start;
    if (array[middleIndex] === value) {
      let i = middleIndex;
      while (array[i - 1] === value) {
        i--;
      }
      return i;
    }
    if (start >= end) return -1;
    if (array[middleIndex] > value) {
      return searchByLimits(0, middleIndex - 1);
    } else {
      return searchByLimits(middleIndex + 1, end);
    }
  }

  return searchByLimits(0, array.length - 1);
}
