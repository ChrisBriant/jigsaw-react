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

function scaleImageData(imageData, scaleFactor) {
  const originalWidth = imageData.width;
  const originalHeight = imageData.height;

  const newWidth = Math.round(originalWidth * scaleFactor);
  const newHeight = Math.round(originalHeight * scaleFactor);

  const scaledImageData = new ImageData(newWidth, newHeight);

  for (let newY = 0; newY < newHeight; newY++) {
    for (let newX = 0; newX < newWidth; newX++) {
      const originalX = Math.round(newX / scaleFactor);
      const originalY = Math.round(newY / scaleFactor);

      const originalIndex = (originalY * originalWidth + originalX) * 4;
      const newIndex = (newY * newWidth + newX) * 4;

      scaledImageData.data[newIndex] = imageData.data[originalIndex];
      scaledImageData.data[newIndex + 1] = imageData.data[originalIndex + 1];
      scaledImageData.data[newIndex + 2] = imageData.data[originalIndex + 2];
      scaledImageData.data[newIndex + 3] = imageData.data[originalIndex + 3];
    }
  }

  return scaledImageData;
}

function drawPiece(piece,ctx,scaleFactor=1) {
  console.log('PIECE',piece);
  piece.forEach(p => {
    console.log('PIECE',p, p.image,p.posX,p.posY);
    const scaledImageData = scaleImageData(p.image,scaleFactor);
    ctx.putImageData(scaledImageData,p.posX * scaleFactor,p.posY * scaleFactor);
  });
}

export {getRandomInt,getArrayDifference,getRandomObjectFromArray,drawPiece};