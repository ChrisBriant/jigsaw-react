import {useContext} from "react";
import {Context as JigsawContext} from "../../context/JigsawContext";
import JigsawPiece from "./JigsawPiece";

const JigsawPieceSelect = () => {
  const {state:{jigsawPieces}} = useContext(JigsawContext);

  return(
    jigsawPieces.length > 0
    ? <JigsawPiece piece={jigsawPieces[0]}  />
    : <p>loading...</p>
  );  
}

export default JigsawPieceSelect;