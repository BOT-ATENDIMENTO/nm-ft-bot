import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  left: 2.5rem;
  top: 19.5rem;
  width: 50px;
  height: auto;
  background-color: #000;
  border-radius: 10px;
  z-index: 1;

  > ul {
    list-style: none;

    > li {
      margin-top: 0.3125rem;
      margin-bottom: 0.3125rem;
      padding: 10px 10px;
      cursor: pointer;
      color: #fff;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    > li:hover {
      background-color: #000;
      border-radius: 15px;
      svg {
        color: #ffa500;
      }
    }
  }
`;
