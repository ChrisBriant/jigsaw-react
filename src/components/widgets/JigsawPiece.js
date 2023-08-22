import {useRef, useEffect} from "react";
import { drawPiece } from "../../helpers/helpers";

const JigsawPiece = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = props.piece.maxPieceSize / 2;
    canvas.height = props.piece.maxPieceSize / 2;
    const context = canvas.getContext('2d');
    context.fillStyle ="#eee";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawPiece(props.piece.centeredPiece,context, 0.5);
    console.log('PROPS',props);
  },[]);

  return(
    <canvas ref={canvasRef} ></canvas>
  );
}

export default JigsawPiece;