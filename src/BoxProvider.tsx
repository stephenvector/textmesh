import React, { useCallback, useState } from "react";
import { Box, Boxes } from "./types";
import getRandomBoxId from "./getRandomBoxId";
import BoxContext from "./BoxContext";

interface BoxProviderProps {
  children: React.ReactNode;
}

export const BoxProvider: React.FC<BoxProviderProps> = (props) => {
  const { children } = props;
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Boxes>({});

  const deleteBox = useCallback(
    (boxId: string) => {
      const newBoxes = { ...boxes };
      delete newBoxes[boxId];
      setBoxes(newBoxes);
    },
    [boxes]
  );

  const addBox = useCallback(
    (newBox: Box) => {
      const newBoxId = getRandomBoxId();

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

  return (
    <BoxContext.Provider
      value={{
        boxes,
        deleteBox,
        addBox,
        updateBox,
        selectBox: setSelectedBoxId,
        selectedBoxId,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export default BoxProvider;
