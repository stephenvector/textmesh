import React from "react";
import { InteractionMode } from "./types";
import ButtonGroup from "./ButtonGroup";
import InteractionModeButton from "./InteractionModeButton";

interface IToolbarProps {
  setCurrentInteractionMode: (interactionMode: InteractionMode) => void;
  currentInteractionMode: InteractionMode;
}

const Toolbar: React.FC<IToolbarProps> = (props) => {
  const { currentInteractionMode, setCurrentInteractionMode } = props;
  return (
    <ButtonGroup>
      <InteractionModeButton
        interactionMode={InteractionMode.Select}
        isSelected={currentInteractionMode === InteractionMode.Select}
        label="Select"
        onClick={setCurrentInteractionMode}
      />
      <InteractionModeButton
        interactionMode={InteractionMode.Draw}
        isSelected={currentInteractionMode === InteractionMode.Draw}
        label="Draw"
        onClick={setCurrentInteractionMode}
      />
      <InteractionModeButton
        interactionMode={InteractionMode.Move}
        isSelected={currentInteractionMode === InteractionMode.Move}
        label="Move"
        onClick={setCurrentInteractionMode}
      />
    </ButtonGroup>
  );
};

export default Toolbar;
