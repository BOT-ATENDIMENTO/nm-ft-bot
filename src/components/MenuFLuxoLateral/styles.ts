import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    display:flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    left: 2.5rem;
    top: 19.5rem;
    width: 50px;
    height: auto;
    background-color:${({ theme }) => theme.COLORS.BACKGROUND_1000};
    border-radius: 10px;
    z-index: 1;

    >ul{
        list-style: none;

        >li{
            margin-top: .3125rem;
            margin-bottom: .3125rem;
            padding: 10px 10px;
            cursor: pointer;
            color: ${({ theme }) => theme.COLORS.SUPER_WHITE};
        }
        
        svg {
            width: 20px;
            height: 20px;
        }

        >li:hover{
            background-color:${({ theme }) => theme.COLORS.BACKGROUND_800};
            border-radius: 15px;
            svg{
                color: ${({ theme }) => theme.COLORS.ORANGE};
            }
        }
    }

`