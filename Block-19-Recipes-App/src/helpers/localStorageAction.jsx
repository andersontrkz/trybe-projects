const localStorageAction = async (newItem, action, actualArray, helper) => {
  const findItem = actualArray.find((item) => item.id === newItem.id);
  const DECIMAL_RADIX = 10;

  switch (action) {
  case 'addOnce':
    if (findItem) {
      return actualArray;
    }
    return [...actualArray, newItem];

  case 'addToggle':
    if (findItem) {
      const filteredArray = actualArray.filter(
        (item) => Number.parseInt(item.id, DECIMAL_RADIX)
        !== Number.parseInt(newItem.id, DECIMAL_RADIX),
      );

      return filteredArray;
    }
    return [...actualArray, newItem];

  case 'addToggleStep':
    if (actualArray.includes(newItem)) {
      const updatedArray = actualArray.filter(
        (arrayId) => Number.parseInt(arrayId, DECIMAL_RADIX)
        !== Number.parseInt(newItem, DECIMAL_RADIX),
      );

      return {
        ...helper.array,
        [helper.curr]: { ...helper.array[helper.curr],
          [helper.id]: [...updatedArray,
          ] } };
    }
    return {
      ...helper.array,
      [helper.curr]: { ...helper.array[helper.curr],
        [helper.id]: [...helper.array[helper.curr][helper.id],
          newItem] } };

  default:
    return actualArray;
  }
};

export default localStorageAction;
