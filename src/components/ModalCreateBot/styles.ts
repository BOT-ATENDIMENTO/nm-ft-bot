import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: block;
  min-width: 100%;
  min-height: 100%;
  flex-direction: row;
`;

export const Card = styled.div`
  z-index: 1;
  background-color: #000;
  margin: auto;
  width: 50%;
  min-height: 50vh;
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  border: 2px solid white;
  @media screen and (max-width: 768px) {
    width: 95vw;
    padding: 0;
    margin: 2rem;
    margin-top: 15rem;
  }

  > .header {
    width: 90%;
    height: 5%;
    font-size: 22px;
    text-align: center;
    margin-top: 1rem;
    color: red;
    font-weight: bold;
    border-bottom: 5px solid #000;
  }
  > .section {
    display: flex;
    flex-direction: column;
    width: 97%;
    margin-top: 1rem;
    border: 2px, solid black;
    border-radius: 10%;

    > label {
      font-size: 28px;
      color: red;
    }
    > div {
      padding: 15px;
      display: flex;
      flex-direction: column;
      > label {
        font-size: 12px;
      }
      > input {
        padding: 10px;
        border-radius: 10px;
        background-color: #000;
        color: #fff;
      }
    }
    > select {
      padding: 10px;
      border-radius: 10px;
      background-color: #000;
      color: #fff;
    }
    > option {
      font-size: 15px;
    }
  }

  .footer {
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10rem;
    margin: 15px;
    button {
      min-width: 7rem;
      padding: 10px;
    }
  }
`;

export const CardMaxBot = styled.div`
  margin-top: 10%;
  text-align: center;
  justify-content: center;
  > h1 {
    color: red;
  }
  > h5 {
    margin-top: 7rem;
  }
  > svg {
    width: 5rem;
    height: 5rem;
    cursor: pointer;
  }
  > svg:hover {
    color: red;
  }
`;
