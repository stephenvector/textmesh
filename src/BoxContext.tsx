import React, { useCallback, useContext, useState } from "react";
import { Boxes, Box } from "./types";
import getRandomBoxId from "./getRandomBoxId";

interface BoxContextValue {
  boxes: Boxes;
  deleteBox: (boxId: string) => void;
  addBox: (newBox: Box) => void;
  updateBox: (boxId: string, updatedBox: Box) => void;
  selectedBoxId: string | null;
  selectBox: (boxId: string) => void;
}

const DEFAULT_VALUE: BoxContextValue = {
  boxes: {},
  selectedBoxId: null,
  selectBox: () => {
    return;
  },
  deleteBox: () => {
    return;
  },
  addBox: () => {
    return;
  },
  updateBox: () => {
    return;
  },
};

const BoxContext = React.createContext<BoxContextValue>(DEFAULT_VALUE);

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

export function useBoxes() {
  return useContext(BoxContext);
}
