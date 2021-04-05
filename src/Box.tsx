import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrowsOutCardinal, Pencil } from "phosphor-react";
import { Box as BoxType } from "./types";
import Modal from "./Modal";
import Textarea from "./Textarea";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";

const BoxContent = styled.div`
  padding: 2rem;
`;

const ModalContent = styled.div`
  display: flex;
  grid-gap: 1rem;
  flex-direction: column;
`;

const Footer = styled.footer`
  display: flex;
  width: 100%;
  align-items: center;
  grid-gap: 1rem;
  justify-content: flex-end;
`;

const MoveButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  width: 3rem;
  height: 3rem;
  visibility: hidden;
  position: absolute;
  top: 1rem;
  right: 3rem;
`;

const EditButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  width: 3rem;
  height: 3rem;
  visibility: hidden;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

type StyledBoxProps = {
  box: BoxType;
  isSelected: boolean;
  isMoving: boolean;
};

const StyledBox = styled.div<StyledBoxProps>`
  position: fixed;
  top: ${(p) => `${p.box.y}px`};
  left: ${(p) => `${p.box.x}px`};
  width: ${(p) => `${p.box.width}px`};
  height: ${(p) => `${p.box.height}px`};
  border-width: 2px;
  border-style: solid;
  background: #fff;
  border-color: ${(p) => (p.isSelected ? "red" : "#000")};
  opacity: ${(p) => (p.isMoving ? "0.5" : "1")};
  &:hover {
    ${EditButton},
    ${MoveButton} {
      visibility: visible;
    }
  }
`;

interface IBoxProps {
  box: BoxType;
  boxId: string;
  deleteBox: (boxIdToDelete: string) => void;
  updateBox: (boxIdToUpdate: string, newBoxValues: BoxType) => void;
  isSelected: boolean;
  selectBox: (boxIdToSelect: string) => void;
}

const Box: React.FC<IBoxProps> = ({
  isSelected,
  selectBox,
  boxId,
  box,
  updateBox,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [isMoving, setIsMoving] = useState(false);

  const handleEditButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsEditing(true);
      setEditorValue(box.content);
    },
    [box]
  );

  const handleBoxUpdate = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditorValue(event.target.value);
    },
    []
  );

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    updateBox(boxId, { ...box, content: editorValue });
  }, [boxId, updateBox, editorValue, box]);

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setIsMoving(false);
      console.log(e.screenX, box);
      updateBox(boxId, {
        ...box,
        x: e.screenX,
        y: e.screenY,
      });
    },
    [updateBox, boxId, box]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setIsMoving(true);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseUp]
  );

  useEffect(() => {
    if (isMoving === false) {
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [isMoving, handleMouseUp]);

  return (
    <>
      <StyledBox
        ref={boxRef}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          selectBox(boxId);
        }}
        box={box}
        isSelected={isSelected}
        isMoving={isMoving}
      >
        <MoveButton onMouseDown={handleMouseDown}>
          <ArrowsOutCardinal />
        </MoveButton>
        <EditButton onClick={handleEditButton}>
          <Pencil />
        </EditButton>
        <BoxContent>{box.content}</BoxContent>
      </StyledBox>
      <Modal
        closeModal={() => {
          setIsEditing(false);
        }}
        isOpen={isEditing}
      >
        <ModalContent>
          <Textarea value={editorValue} onChange={handleBoxUpdate} />
          <Footer>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </Footer>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Box;
