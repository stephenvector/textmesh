import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Pencil } from "phosphor-react";
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
  &:hover {
    ${EditButton} {
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
  const [isEditing, setIsEditing] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  const handleEditButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
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

  return (
    <>
      <StyledBox
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          selectBox(boxId);
        }}
        box={box}
        isSelected={isSelected}
      >
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
