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

`;


