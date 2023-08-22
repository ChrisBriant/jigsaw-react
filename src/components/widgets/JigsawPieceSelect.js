import {useContext} from "react";
import {Context as JigsawContext} from "../../context/JigsawContext";

const JigsawPieceSelect = () => {
  const {state:{jigsaw}} = useContext(JigsawContext);

  return(
    jigsaw.length > 0
    ? <p>selected piece goes here.</p>
    : <p>loading...</p>
  );  
}

export default JigsawPieceSelect;