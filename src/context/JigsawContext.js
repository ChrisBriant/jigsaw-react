import createDataContext from './createDataContext';

const defaultState = {
  imageGrid : [],
  jigsaw : [],
  jigsawPieces : [],
  canvasWidth : 0,
  canvasHeight : 0,
  segmentSize : 0,
  tileSizeFactor : 0,
  maxPieceSize : 0,
};

const jigsawReducer = (state,action) => {

  switch(action.type) {
    case 'setGrid':
      return {...state,imageGrid:action.payload};
    case 'setJigsaw':
      return {...state,jigsaw:action.payload};
    case 'setJigsawPieces':
      const jigsawPieces = []; 
      //const piece = action.payload.jigsaw[0];
      action.payload.jigsaw.forEach(piece => {
        const originalPiece = getJigSawPieceObject(piece,state.imageGrid);
        const translatedPiece = translateJigSawPiece(originalPiece);
        const pieceSize = getPieceSize(translatedPiece);
        const centeredPiece = translateJigSawPieceCenter(translatedPiece,pieceSize,action.payload.maxPieceSize);
        const pieceObj = {
          originalPiece,
          translatedPiece,
          pieceSize,
          centeredPiece,
          maxPieceSize : action.payload.maxPieceSize,
        }
        jigsawPieces.push(pieceObj)
        //console.log('pieceObj',pieceObj, pieceSize,translatedPiece,centeredPiece);
      });
      return {...state,jigsawPieces:jigsawPieces,maxPieceSize:action.payload.maxPieceSize};
    case 'setCanvas':
      return {...state,
        canvasWidth:action.payload.width,
        canvasHeight:action.payload.height,
        segmentSize:action.payload.segmentSize,
        tileSizeFactor: action.payload.tileSizeFactor
      };
    default:
      return defaultState;
  }
};

//Helper Functions

//Gets the jigsaw piece as an object, containing all the tiles
function getJigSawPieceObject(piece,grid) {
  let jigsawPiece = [];
  piece.forEach(idx => {
      jigsawPiece.push(grid[idx]);
  });
  return jigsawPiece;
}

function translateJigSawPiece(piece) {
  let minXPiece = null;
  let minYPiece = null;

  //Iterate through and find the tile(s) with the smallest x and smallest y values
  piece.forEach(segment => {
      if(!minXPiece && !minYPiece) {
          minXPiece = segment;
          minYPiece = segment;
      } else {
          if(segment.posX < minXPiece.posX) {
              minXPiece = segment;
          }
          if(segment.posY < minYPiece.posY) {
              minYPiece = segment;
          }
      } 
  });

  //Reduce the x and y coordinates of each piece
  let pieceCopy = [...piece];
  let newPiece = [];
  pieceCopy.forEach(segment => {
      let newSegment = {...segment};
      newSegment.posX = segment.posX - minXPiece.posX;
      newSegment.posY = segment.posY - minYPiece.posY;
      newPiece.push(newSegment);                
  });
  return newPiece;
}

function getPieceSize(piece) {
  let maxY = null;
  let maxX = null;

  piece.forEach(p => {
    if(!maxX && !maxY) {
      maxX = p.posX;
      maxY = p.posY;
    } else {
      if(p.posX > maxX) {
        maxX += p.posX;
      } 
      if(p.posY > maxY) {
        maxY += p.posY;
      } 
    }
  });
  return {
    width : maxX + piece[0].width,
    height : maxY + piece[0].height,
  }
}

function translateJigSawPieceCenter(piece,pieceSize,maxWidth) {
  const translateY = (maxWidth/ 2) - (pieceSize.height / 2);
  const translateX = (maxWidth/ 2) - (pieceSize.width / 2);
  let newPiece = [];

  piece.forEach(segment => {
      let newSegment = {...segment};
      newSegment.posX = segment.posX + translateX;
      newSegment.posY = segment.posY + translateY;
      newPiece.push(newSegment);                
  });
  return newPiece;
} 

//Setters

const setGrid = (dispatch) => async (grid) => {
  dispatch({type:'setGrid', payload:grid});
}

const setJigsaw = (dispatch) => async (grid) => {
  dispatch({type:'setJigsaw', payload:grid});
}

const setJigsawPieces = (dispatch) => async (jigsaw,maxPieceSize) => {
  dispatch({type:'setJigsawPieces', payload:{jigsaw, maxPieceSize}});
}

const setCanvas = (dispatch) => async (width,height,segmentSize,tileSizeFactor) => {
  dispatch({type:'startCanvas', payload:{width,height,segmentSize,tileSizeFactor}}); 
}



export const {Provider, Context} = createDataContext (
    jigsawReducer,
    { setGrid,setCanvas,setJigsaw,setJigsawPieces,
    },
    {...defaultState}
);