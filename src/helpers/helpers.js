function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayDifference(array1, array2) {
  return array1.filter(item1 => !array2.some(item2 => (item1 === item2) && (item1 === item2) ));
}

function getRandomObjectFromArray(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export {getRandomInt,getArrayDifference,getRandomObjectFromArray};