import React, { useCallback } from "react";
import { InteractionMode } from "./types";
import ButtonGroupButton from "./ButtonGroupButton";

interface IInteractionModeProps {
  interactionMode: InteractionMode;
  isSelected: boolean;
  label: string;
  onClick: (interactionMode: InteractionMode) => void;
}

const InteractionModeButton: React.FC<IInteractionModeProps> = (props) => {
  const { label, isSelected, interactionMode, onClick } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClick(interactionMode);
    },
    [onClick, interactionMode]
  );

  return (
    <ButtonGroupButton
      isSelected={isSelected}
      type="button"
      onClick={handleClick}
    >
      {label}
    </ButtonGroupButton>
  );
};

export default InteractionModeButton;
