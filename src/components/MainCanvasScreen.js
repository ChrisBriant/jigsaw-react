import {useRef, useEffect, useContext} from "react";
import {Context as JigsawContext} from "../context/JigsawContext";
import {getRandomInt,getArrayDifference,getRandomObjectFromArray} from "../helpers/helpers";
import image from '../assets/img/image.jpg';

const MainCanvasScreen = () => {
  const {setGrid,setCanvas,setJigsaw,setJigsawPieces} = useContext(JigsawContext);
  const canvasRef = useRef(null);

  //const canvas = canvasRef.current;

  //Create the grid
  let grid = [];
  const tileSizeFactor = 16;
  let canvasWidth = 0;
  let canvasHeight = 0;

  //Temporary Storage Variables
  let selectedTiles = [];
  let jigsawPieces = [];

  function getTileIndexAndGridCoordsWithSurroundingTiles(posX,posY, tileSize) {
    const xGrid = tileSizeFactor - ((canvasWidth - posX) / tileSize);
    const yGrid = tileSizeFactor - ((canvasHeight - posY) / tileSize);

    let tileAdjacentObj = {
      xGrid,
      yGrid,
      grdIdx : yGrid * tileSizeFactor + xGrid,
      surroundingTiles : {
        topTile : yGrid > 0 ?{
          xGrid : xGrid,
          yGrid : yGrid -1, 
          grdIdx : (yGrid -1) * tileSizeFactor + xGrid
        } : null,
        bottomTile : yGrid < tileSizeFactor - 1 ?{
          xGrid : xGrid,
          yGrid : yGrid + 1, 
          grdIdx : (yGrid +1) * tileSizeFactor + xGrid
        } : null,
        leftTile : xGrid > 0 ? {
          xGrid : xGrid - 1,
          yGrid : yGrid, 
          grdIdx : yGrid * tileSizeFactor + (xGrid - 1)
        } : null,
        rightTile : xGrid < tileSizeFactor - 1 ? {
          xGrid : xGrid + 1,
          yGrid : yGrid, 
          grdIdx : yGrid * tileSizeFactor + (xGrid + 1)
        } : null,
      }
    }

    //filter out tiles which are already selected
    let found = selectedTiles.find((idx) => idx === tileAdjacentObj.grdIdx) || null
    if(found) {
      return null;
    }

    //Search the adjacent tiles
    const adjacentTilesNotNull = Object.values(tileAdjacentObj.surroundingTiles).filter( val => val !== null);
    Object.keys(adjacentTilesNotNull).forEach((key) => {
      found = selectedTiles.find((idx) => idx === adjacentTilesNotNull[key].grdIdx) || null
      if(found) {
        tileAdjacentObj.surroundingTiles[key] = null;
      }
    });

    return tileAdjacentObj;
  }

  function makeJigsawPiece(posX,posY,tileSize,size=0,tiles=[]) {
    //Exit condition
    if(size === 0) {
      return tiles;
    }

    const tileRefAndAdjacent = getTileIndexAndGridCoordsWithSurroundingTiles(posX,posY,tileSize);
    if(!tileRefAndAdjacent) {
      return tiles;
    }

    //Add the piece to selected and new tiles which is the jigsaw piece
    selectedTiles.push(tileRefAndAdjacent.grdIdx);
    const newTiles = [...tiles,tileRefAndAdjacent.grdIdx];

    const adjacentTilesNotNull = Object.values(tileRefAndAdjacent.surroundingTiles).filter( val => val !== null);
    //console.log('Available Adjacent Tiles', tileRefAndAdjacent, adjacentTilesNotNull);
    if(adjacentTilesNotNull.length === 0) {
      return newTiles;
    }
    const nextTile = getRandomObjectFromArray(adjacentTilesNotNull);
    const newSize = size - 1;
    const newPosX = grid[nextTile.grdIdx].posX
    const newPosY = grid[nextTile.grdIdx].posY
    return makeJigsawPiece(newPosX,newPosY,tileSize,newSize,newTiles);
  }



  const createJigsaw = () => {
    const gridIndices = grid.map((_,idx) => idx);
    const remainingTiles = getArrayDifference(gridIndices,selectedTiles);
    if(remainingTiles.length < 1) {
      return;
    }
    const randomTileIndex = getRandomObjectFromArray(remainingTiles);
    const size = getRandomInt(4,8);
    const piece = makeJigsawPiece(grid[randomTileIndex].posX,grid[randomTileIndex].posY,grid[randomTileIndex].width,size);
    //console.log('THE PIECE IS', piece,selectedTiles);
    jigsawPieces.push(piece);
    return createJigsaw();
  }

  useEffect(() => {

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d',{ willReadFrequently: true });

      canvas.width = img.width / 2;
      canvas.height = img.width / 2;

      context.drawImage(img, 0, 0,canvas.height,canvas.width);

      // //Create the grid
      // let grid = [];
      // const tileSizeFactor = 16;
      // Get the width and height of each segment
      const segmentWidth = canvas.width / tileSizeFactor;
      const segmentHeight = canvas.height / tileSizeFactor;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      setCanvas(canvas.width,canvas.height,segmentWidth,tileSizeFactor);

      // Loop through each segment
      for (let row = 0; row < tileSizeFactor; row++) {
          for (let col = 0; col < tileSizeFactor; col++) {
              // Get the x and y coordinates of the segment
              const x = col * segmentWidth;
              const y = row * segmentHeight;

              // Get the image data for the segment
              const imageData = context.getImageData(x, y, segmentWidth, segmentHeight);
              let imageTile = {
                  image : imageData,
                  posX : x,
                  posY : y,
                  width : segmentWidth,
                  height : segmentHeight,
              }
              grid.push(imageTile);
          }
      }
      //Clear the canvas
      context.fillStyle = "#fff";
      context.fillRect(0,0,canvasWidth,canvasHeight);

      //Store the grid in context state
      setGrid(grid);
      createJigsaw();
      console.log('JIGSAW DONE', jigsawPieces);
      //setJigsaw(jigsawPieces);
      setJigsawPieces(jigsawPieces,256);
      
    }

    //console.log('The image is', image);

    // Draw on the canvas
    // context.fillStyle = '#eee';
    // context.fillRect(0, 0, 400, 200);
    // context.fillStyle = 'green';
    // context.fillRect(10, 10, 150, 150);
  }, []);

  return(
    <canvas ref={canvasRef} ></canvas>
  );

}

export default MainCanvasScreen;