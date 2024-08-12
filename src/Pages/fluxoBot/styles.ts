import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 9rem auto 3rem;
  grid-template-areas:
    "header"
    "content"
    "footer";
  background-color: 000;
`;

export const Content = styled.div`
  grid-area: content;
  display: flex;
  justify-content: center;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff0000;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: 000;
  }
`;

export const ContentUseAI = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin: auto;
  background-color: 000;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff0000;
    border-radius: 5px;
  }

  /* Estilos para a área de rolagem (área ao redor da barra) */
  ::-webkit-scrollbar-track {
    background-color: 000;
    /* cor de fundo da área de rolagem */
  }
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
`;

export const ContainerCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  gap: 1rem;
  grid-template-areas:
    "box1 box2"
    "box3 box3";
  width: 90%;
  border: 0.1rem #ccc solid;
  border-radius: 1rem;
  margin: 1.5rem;

  .box1 {
    grid-area: box1;
  }

  .box2 {
    grid-area: box2;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10rem;
  }

  .box3 {
    grid-area: box3;
  }
  .box1,
  .box2,
  .box3 {
    padding: 1rem;
    > input {
      padding: 10px;
      width: 100%;
      max-height: 6rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.6rem;
      outline: none;
      &:focus {
        border-color: blue;
      }
    }
    > select {
      padding: 10px;
      width: 100%;
      max-height: 6rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.6rem;
      outline: none;
      &:focus {
        border-color: blue;
      }
    }
    > textarea {
      padding: 10px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.6rem;
      outline: none;
      &:focus {
        border-color: blue;
      }
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "box1"
      "box2"
      "box3"
      "box4";
    .box1,
    .box2,
    .box3,
    .box4 {
      width: 100%;
    }
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const Subtitle = styled.span`
  font-size: 1.2rem;
`;

export const ContentConfiguracoes = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 70vw;
  background-color: 000;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto; /* Adicionando overflow-y para permitir rolagem vertical */
  max-height: calc(100vh - 120px);
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
`;

export const ContentVariaveis = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 40vw;
  margin: auto;
  background-color: #000;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto; /* Adicionando overflow-y para permitir rolagem vertical */
  max-height: calc(100vh - 120px);
  /* z-index: 99; */
  @media screen and (max-width: 768px) {
    width: 95vw;
    height: 90vh;
  }
`;

export const TableVariables = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 0.1rem solid #ddd;
    padding: 0.8rem;
  }

  th {
    font-weight: bold;
  }

  input[type="text"] {
    width: 100%;
    padding: 06rem;
    box-sizing: border-box;
  }

  button {
    padding: 0.8rem;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;
