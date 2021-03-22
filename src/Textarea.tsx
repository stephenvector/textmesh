import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  font: inherit;
  font-family: monospace;
  border: none;
  background: #f2f2f2;
  min-height: 8rem;
  border-radius: 0;
  padding: 1rem;
  outline: none;
  &:focus {
    box-shadow: 0 0 1px 0 blue;
  }
`;

export default Textarea;
