import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Box as BoxType } from "./types";
import Box from "./Box";
import { useBoxes } from "./BoxContext";

interface CurrentlyDrawingBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const CurrentBox = styled.div<{ box: CurrentlyDrawingBox }>`
  position: fixed;
  left: ${(p) => `${p.box.startX < p.box.endX ? p.box.startX : p.box.endX}px`};
  top: ${(p) => `${p.box.startY < p.box.endY ? p.box.startY : p.box.endY}px`};
  width: ${(p) => `${Math.abs(p.box.endX - p.box.startX)}px`};
  height: ${(p) => `${Math.abs(p.box.startY - p.box.endY)}px`};
  background: pink;
`;

const StyledWhiteboard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 0;
`;

const Whiteboard: React.FC = (props) => {
  const {
    boxes,
    addBox,
    updateBox,
    deleteBox,
    selectedBoxId,
    selectBox,
  } = useBoxes();
  const [currentBox, setCurrentBox] = useState<CurrentlyDrawingBox | null>(
    null
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleOnClick = useCallback<React.MouseEventHandler>(() => {}, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    if (currentBox !== null) {
      const newBox: BoxType = {
        x:
          currentBox.startX < currentBox.endX
            ? currentBox.startX
            : currentBox.endX,
        y:
          currentBox.startY < currentBox.endY
            ? currentBox.startY
            : currentBox.endY,
        content: "",
        width: Math.abs(currentBox.startX - currentBox.endX),
        height: Math.abs(currentBox.startY - currentBox.endY),
      };
      addBox(newBox);
      setCurrentBox(null);
    }
  }, [currentBox, addBox]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsMouseDown(true);
      if (currentBox === null) {
        setCurrentBox({
          startX: event.clientX,
          startY: event.clientY,
          endX: event.clientX,
          endY: event.clientY,
        });
      } else {
        setCurrentBox({
          ...currentBox,
          endX: event.clientX,
          endY: event.clientY,
        });
      }
    },
    [currentBox]
  );

  const handleMouseMove = useCallback<React.MouseEventHandler>(
    (event) => {
      if (isMouseDown && currentBox !== null) {
        setCurrentBox({
          ...currentBox,
          endX: event.clientX,
          endY: event.clientY,
        });
      }
    },
    [isMouseDown, currentBox]
  );

  return (
    <StyledWhiteboard
      onClick={handleOnClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {Object.entries(boxes).map(([boxId, box]) => (
        <Box
          key={boxId}
          boxId={boxId}
          box={box}
          updateBox={updateBox}
          deleteBox={deleteBox}
          isSelected={selectedBoxId === boxId}
          selectBox={selectBox}
        />
      ))}
      {currentBox !== null && <CurrentBox box={currentBox} />}
    </StyledWhiteboard>
  );
};

export default Whiteboard;
