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
}

const Box: React.FC<IBoxProps> = (props) => {
  return (
    <StyledBox
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        alert("NO");
      }}
      box={props.box}
      isSelected={props.isSelected}
    />
  );
};

export default Box;
