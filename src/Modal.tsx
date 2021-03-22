import React, { useCallback } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 0;
  max-width: 32rem;
  min-height: 10rem;
  width: 100%;
  box-shadow: 0 0 3rem 0 rgba(0, 0, 0, 0.2);
`;

type ModalProps = {
  isOpen: boolean;
  closeModal?: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  const handleMouseEvents = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
    },
    []
  );

  if (!isOpen) return null;

  return (
    <ModalOverlay
      onClick={(e) => {
        e.stopPropagation();
        if (closeModal) {
          closeModal();
        }
      }}
      onMouseDown={handleMouseEvents}
      onMouseUp={handleMouseEvents}
    >
      <ModalContent
        onClick={handleMouseEvents}
        onMouseDown={handleMouseEvents}
        onMouseUp={handleMouseEvents}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
