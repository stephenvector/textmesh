import React from "react";
import { Boxes, Box } from "./types";

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

export default BoxContext;
