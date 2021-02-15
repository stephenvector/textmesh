import React, { useCallback, useEffect, useRef, useState } from "react";
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

const CodeSpacer = styled.code`
  background: pink;
  font-size: 1rem;
  line-height: 1rem;
  font-family: monospace;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const CurrentBox = styled.div<{ box: CurrentlyDrawingBox }>`
  position: fixed;
  left: ${(p) => `${p.box.startX < p.box.endX ? p.box.startX : p.box.endX}px`};
  top: ${(p) => `${p.box.startY < p.box.endY ? p.box.startY : p.box.endY}px`};
  width: ${(p) => `${Math.abs(p.box.endX - p.box.startX)}px`};
  height: ${(p) => `${Math.abs(p.box.startY - p.box.endY)}px`};
  background: pink;
`;

const StyledWhiteboard = styled.pre`
  font-size: 1rem;
  line-height: 1rem;
  font-family: monospace;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 0;
  margin: 0;
  padding: 0;
`;

const Whiteboard: React.FC = () => {
  const codeRef = useRef<HTMLElement>(null);
  const whiteboardRef = useRef<HTMLPreElement>(null);
  const [spanSize, setSpanSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [rowsColumns, setRowsColumns] = useState<{
    rows: number;
    columns: number;
  }>({ rows: 0, columns: 0 });
  const { boxes, addBox, updateBox, deleteBox, selectedBoxId } = useBoxes();
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
    (event: React.MouseEvent<HTMLPreElement, MouseEvent>) => {
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

  useEffect(() => {
    if (codeRef.current) {
      const clientRect = codeRef.current.getBoundingClientRect();
      setSpanSize({
        width: clientRect.width,
        height: clientRect.height,
      });
    }
  }, []);

  useEffect(() => {
    if (whiteboardRef.current) {
      const clientRect = whiteboardRef.current.getBoundingClientRect();
      setRowsColumns({
        columns: Math.floor(clientRect.width / spanSize.width),
        rows: Math.floor(clientRect.height / spanSize.height),
      });
    }
  }, [spanSize]);

  return (
    <StyledWhiteboard
      onClick={handleOnClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={whiteboardRef}
    >
      {Object.entries(boxes).map(([boxId, box]) => (
        <Box
          key={boxId}
          boxId={boxId}
          box={box}
          updateBox={updateBox}
          deleteBox={deleteBox}
          isSelected={selectedBoxId === boxId}
        />
      ))}
      {currentBox !== null && <CurrentBox box={currentBox} />}
      <CodeSpacer ref={codeRef}>&nbsp;</CodeSpacer>
    </StyledWhiteboard>
  );
};

export default Whiteboard;
