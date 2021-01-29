import React, { useCallback, useState } from "react";
import { DEFAULT_BOX_WIDTH, DEFAULT_BOX_HEIGHT } from "./constants";
import getRandomBoxId from "./getRandomBoxId";
import { Box, Boxes, InteractionMode } from "./types";
import Toolbar from "./Toolbar";
import Whiteboard from "./Whiteboard";

const App: React.FC = () => {
  const [
    currentInteractionMode,
    setCurrentInteractionMode,
  ] = useState<InteractionMode>(InteractionMode.Select);

  const [boxes, setBoxes] = useState<Boxes>({});

  const addBox = useCallback(
    (x: number, y: number) => {
      const newBoxId = getRandomBoxId();
      const newBox: Box = {
        x,
        y,
        content: "",
        width: DEFAULT_BOX_WIDTH,
        height: DEFAULT_BOX_HEIGHT,
      };
      setBoxes({
        ...boxes,
        [newBoxId]: newBox,
      });
    },
    [boxes]
  );

  const updateBox = useCallback(
    (boxId: string, updatedBoxValue: Box) => {
      setBoxes({
        ...boxes,
        [boxId]: updatedBoxValue,
      });
    },
    [boxes]
  );

  const deleteBox = useCallback(
    (boxIdToDelete: string) => {
      const newBoxes: Boxes = {};
      Object.entries(boxes).forEach(([boxId, box]) => {
        if (boxId !== boxIdToDelete) {
          newBoxes[boxId] = box;
        }
      });

      setBoxes(newBoxes);
    },
    [boxes]
  );

  return (
    <div>
      <Toolbar
        currentInteractionMode={currentInteractionMode}
        setCurrentInteractionMode={setCurrentInteractionMode}
      />
      <Whiteboard
        currentInteractionMode={currentInteractionMode}
        boxes={boxes}
        updateBox={updateBox}
        addBox={addBox}
        deleteBox={deleteBox}
      />
    </div>
  );
};

export default App;
