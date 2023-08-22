import createDataContext from './createDataContext';

const defaultState = {
  imageGrid : [],
  canvasWidth : 0,
  canvasHeight : 0,
  segmentSize : 0,
  tileSizeFactor : 0,
};

const timerReducer = (state,action) => {

  switch(action.type) {
    case 'setGrid':
      return {...state,imageGrid:action.payload};
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



//Setters

const setGrid = (dispatch) => async (grid) => {
  dispatch({type:'setGrid', payload:grid});
}

const setCanvas = (dispatch) => async (width,height,segmentSize,tileSizeFactor) => {
  dispatch({type:'startCanvas', payload:{width,height,segmentSize,tileSizeFactor}}); 
}



export const {Provider, Context} = createDataContext (
    timerReducer,
    { setGrid,setCanvas,
    },
    {...defaultState}
);