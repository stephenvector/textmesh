import React from "react";
import styled from "styled-components";
import { Box as BoxType } from "./types";

const StyledBox = styled.div<{ box: BoxType; isSelected: boolean }>`
  position: fixed;
  top: ${(p) => `${p.box.y}px`};
  left: ${(p) => `${p.box.x}px`};
  width: ${(p) => `${p.box.width}px`};
  height: ${(p) => `${p.box.height}px`};
  border-width: 2px;
  border-style: solid;
  background: #fff;
  border-color: ${(p) => (p.isSelected ? "red" : "#000")};
`;

interface IBoxProps {
  box: BoxType;
  boxId: string;
  deleteBox: (boxIdToDelete: string) => void;
  updateBox: (boxIdToUpdate: string, newBoxValues: BoxType) => void;
  isSelected: boolean;
  selectBox: (boxIdToSelect: string) => void;
}

const Box: React.FC<IBoxProps> = ({ isSelected, selectBox, boxId, box }) => {
  return (
    <StyledBox
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        selectBox(boxId);
      }}
      box={box}
      isSelected={isSelected}
    />
  );
};

export default Box;
