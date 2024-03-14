import styled from "styled-components";


export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 90px auto 30px;
    grid-template-areas: 
       "header"
       "content"
       "footer" 
    ;
    background-color: ${({ theme }) => theme.COLORS.BLACK_300};
`;

export const Content = styled.div`
    grid-area: content;
    display: flex;
    justify-content: center;
    ::-webkit-scrollbar {
        /* largura da barra de rolagem */
        width: 5px;
    }
    /* Estilos para o rastreador (a própria barra) */
    ::-webkit-scrollbar-thumb {
        background-color:  ${({ theme }) => theme.COLORS.ORANGE};
        /* cor da barra de rolagem */
        border-radius: 5px;
        /* borda arredondada */
    }

    /* Estilos para a área de rolagem (área ao redor da barra) */
    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.COLORS.BLACK_300};
        /* cor de fundo da área de rolagem */
    }
`;

export const ContentUseAI = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin: auto;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    background-color:  ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border-radius: 10px;
    padding: 10px;
    overflow-y: auto; /* Adicionando overflow-y para permitir rolagem vertical */
    max-height: calc(100vh - 120px);
    ::-webkit-scrollbar {
        width: 5px;
        /* largura da barra de rolagem */
    }
    /* Estilos para o rastreador (a própria barra) */
    ::-webkit-scrollbar-thumb {
        background-color:  ${({ theme }) => theme.COLORS.ORANGE};
        /* cor da barra de rolagem */
        border-radius: 5px;
        /* borda arredondada */
    }

    /* Estilos para a área de rolagem (área ao redor da barra) */
    ::-webkit-scrollbar-track {
        background-color:  ${({ theme }) => theme.COLORS.BACKGROUND_800};
        /* cor de fundo da área de rolagem */
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
    border: 1px #ccc solid;
    border-radius:10px;
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
    .box1, .box2, .box3 {
        padding: 1rem;
        >input{
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
        >select{
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
        >textarea{
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
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
`;


export const ContentConfiguracoes = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 70vw;
    background-color:  ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border-radius: 10px;
    padding: 10px;
    overflow-y: auto; /* Adicionando overflow-y para permitir rolagem vertical */
    max-height: calc(100vh - 120px);
`;

export const ContentVariaveis = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 40vw;
    margin: auto;
    background-color:  ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border-radius: 10px;
    padding: 10px;
    overflow-y: auto; /* Adicionando overflow-y para permitir rolagem vertical */
    max-height: calc(100vh - 120px);
    z-index: 99;
`;

export const TableVariables = styled.table`
    width: 100%;
    border-collapse: collapse;
    th,td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        font-weight: bold;
    }

    input[type="text"] {
        width: 100%;
        padding: 6px;
        box-sizing: border-box;
    }

    button {
        padding: 8px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
`;
