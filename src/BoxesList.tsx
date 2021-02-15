import React, { useState } from "react";
import styled from "styled-components";
import { IoListCircle } from "react-icons/io5";
import { useBoxes } from "./BoxContext";

const BoxListToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: inherit;
  height: 2rem;
  width: 2rem;
  border: none;
  border-radius: 1rem;
  z-index: 1000;
`;

const BoxListContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  width: 220px;
  bottom: 0;
  right: ${(p) => (p.isVisible ? "0" : "-220px")};
  padding: 1rem;
  padding-top: 4rem;
  transition: all 200ms;
  background: #f2f2f2;
  border-left: 1px solid #ddd;
`;

const BoxListItem = styled.div<{ isSelected: boolean }>`
  background: ${(p) => (p.isSelected ? "#000" : "transparent")};
  color: ${(p) => (p.isSelected ? "#fff" : "#000")};
`;

const BoxesList: React.FC = () => {
  const { boxes, deleteBox, selectedBoxId, selectBox } = useBoxes();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <BoxListToggleButton
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setIsVisible(!isVisible);
        }}
      >
        <IoListCircle />
      </BoxListToggleButton>
      <BoxListContainer isVisible={isVisible}>
        {Object.entries(boxes).map(([boxId, box]) => {
          return (
            <BoxListItem
              isSelected={selectedBoxId === boxId}
              key={boxId}
              onClick={(e) => {
                e.preventDefault();
                selectBox(boxId);
              }}
            >
              {boxId}{" "}
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  deleteBox(boxId);
                }}
              >
                Delete
              </button>
            </BoxListItem>
          );
        })}
      </BoxListContainer>
    </>
  );
};

export default BoxesList;
