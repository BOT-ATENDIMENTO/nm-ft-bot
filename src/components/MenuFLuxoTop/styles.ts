import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  left: 80%;
  top: 5.5rem;
  width: auto;
  height: auto;
  background-color: #000;
  border-radius: 10px;
  z-index: 1;

  > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    > li {
      margin-top: 0.3125rem;
      margin-bottom: 0.3125rem;
      padding: 10px 10px;
      cursor: pointer;
      color: #fff;
    }

    svg {
      width: 30px;
      height: 30px;
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
