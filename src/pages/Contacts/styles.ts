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
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`;

export const Content = styled.div`
    grid-area: content;
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto 1fr; /* Primeira linha se ajusta ao conteúdo, segunda linha ocupa o restante do espaço */
    grid-template-areas:
        'header header'
        'side main';
    height: 100%;
`;

export const TitleHeader = styled.div`
  grid-area: header;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SidePanel = styled.div`
  grid-area: side;
  margin: 2rem;
  background-color:${({ theme }) => theme.COLORS.BACKGROUND_900};
`;

export const MainPanel = styled.div`
  grid-area: main;
  margin: 2rem;
`;

export const ContainerCard = styled.div`
    display: grid;
    grid-template-columns: 10% 70% 15%; 
    gap: 1rem;
    grid-template-areas:
        "box1 box2 box3"
        "box1 box4 box3";
    width: 90%;
    border: 1px #ccc solid;
    border-radius:10px;
    margin: 1.5rem;
    padding: 1.1rem;
    .box1 {
        grid-area: box1;
        display: flex;
        justify-content: flex-start; 
        align-items: center; 
        /* background-color: red; */
        margin-right: 2rem;
        >img{
            width: 100%;
            border-radius: 50%;
        }
    }

    .box2 {
        grid-area: box2;
        display: flex;
        justify-content: start;
        align-items: center;
        /* background-color: rebeccapurple; */
        gap: 2rem;
    }

    .box3 {
        grid-area: box3;
        display: flex;
        justify-content: flex-end; 
        align-items: center; 
        gap: 1.2rem;
        >svg{
            width: 3rem;
            height: 3rem;
        }
        >svg:hover{
            cursor: pointer;
            color:${({ theme }) => theme.COLORS.ORANGE};
        }
    }

    .box4 {
        grid-area: box4;
        display: flex;
        justify-content: start;
        align-items: center;
        /* background-color: rebeccapurple; */
        gap: 2rem;
    }
`;

export const Pagination = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    >button{
        padding: 1rem;
        border-radius: 50%;
    }

    >button:hover{
        background-color:${({ theme }) => theme.COLORS.ORANGE};
    }
    .selected{
        color: ${({ theme }) => theme.COLORS.BACKGROUND_900};;
        background-color:${({ theme }) => theme.COLORS.ORANGE};
    }
`;