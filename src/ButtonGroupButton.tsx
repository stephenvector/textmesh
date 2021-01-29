import styled from "styled-components";

export interface IButtonGroupButtonProps {
  isSelected: boolean;
}

const ButtonGroupButton = styled.button<IButtonGroupButtonProps>`
  border: none;
  padding: 0.5rem 0.75rem;
  line-height: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font: inherit;
  color: ${(p) => (p.isSelected ? "#fff" : "#000")};
  background: ${(p) => (p.isSelected ? "#000" : "#f2f2f2")};
`;

export default ButtonGroupButton;
