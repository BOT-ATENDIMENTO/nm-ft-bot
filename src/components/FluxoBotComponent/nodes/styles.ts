import styled from "styled-components";
import { Handle, NodeResizer } from "reactflow";

export const StyledSquare = styled.div`
  position: relative;
  background-color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  max-width: 200px;

  .active {
    border: 5px solid orange;
  }
  > div {
    display: block;
    margin: auto;
    padding: 15px;
  }
`;

export const StyledHandle = styled(Handle)``;
