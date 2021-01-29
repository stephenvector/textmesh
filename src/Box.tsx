import React from "react";
import styled from "styled-components";
import { Box as BoxType } from "./types";

const StyledBox = styled.div``;

interface IBoxProps {
  box: BoxType;
  boxId: string;
  deleteBox: (boxIdToDelete: string) => void;
  updateBox: (boxIdToUpdate: string, newBoxValues: BoxType) => void;
}

const Box: React.FC<IBoxProps> = () => {
  return <StyledBox />;
};

export default Box;
