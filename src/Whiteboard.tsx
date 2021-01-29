import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Boxes, InteractionMode, Box as BoxType } from "./types";
import Box from "./Box";

interface IStyledWhiteboardProps {
  isDrawing: boolean;
}

const StyledWhiteboard = styled.div<IStyledWhiteboardProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(p) => (p.isDrawing ? "#f2f2f2" : "#fff")};
  z-index: 0;
`;

interface IWhiteboardProps {
  boxes: Boxes;
  addBox: (x: number, y: number) => void;
  deleteBox: (boxId: string) => void;
  updateBox: (boxId: string, newBoxValue: BoxType) => void;
  currentInteractionMode: InteractionMode;
}

const Whiteboard: React.FC<IWhiteboardProps> = (props) => {
  const { boxes, addBox, updateBox, currentInteractionMode, deleteBox } = props;

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleOnClick = useCallback<React.MouseEventHandler>(() => {}, []);

  const handleDoubleClick = useCallback<React.MouseEventHandler>(
    (e) => {
      addBox(e.clientX, e.clientY);
    },
    [addBox]
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const handleMouseMove = useCallback<React.MouseEventHandler>(
    (e) => {
      if (isMouseDown) {
        console.log(e.clientX, e.clientY);
      }
    },
    [isMouseDown]
  );

  const isDrawing = useMemo(() => {
    if (currentInteractionMode !== InteractionMode.Draw) return false;

    return isMouseDown;
  }, [currentInteractionMode, isMouseDown]);

  return (
    <StyledWhiteboard
      onClick={handleOnClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      isDrawing={isDrawing}
      onDoubleClick={handleDoubleClick}
    >
      {Object.entries(boxes).map(([boxId, box]) => (
        <Box
          key={boxId}
          boxId={boxId}
          box={box}
          updateBox={updateBox}
          deleteBox={deleteBox}
        />
      ))}
    </StyledWhiteboard>
  );
};

export default Whiteboard;
