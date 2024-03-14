import styled from "styled-components";

export const Container = styled.div`
    background-color: red;

    display:flex;
    flex-direction: row;
`;

export const Links = styled.ul`

    list-style: none;

    >li{
        margin-top: 12px;

        a{
            color: ${({ theme }) => theme.COLORS.WHITE};
        }
    }
`