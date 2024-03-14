import styled from 'styled-components';
import { Handle, NodeResizer } from "reactflow";

export const StyledSquare = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_1000};
    border-radius: 5px;
    max-width: 200px;

    .active{
        border: 5px solid ${({ theme }) => theme.COLORS.ORANGE};
    }
    >div{
        display: block;
        margin: auto;
        padding: 15px;
    }
`;

export const StyledHandle = styled(Handle)`
`;
