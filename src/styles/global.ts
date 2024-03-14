import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }
    :root{
        font-size: 62.5%;
    }
    body{
        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color:  ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.6rem;
    }
    body, input, button, textarea{
        font-family: 'Roboto Slab', serif;
        outline: none;
    }

    a{
        text-decoration: none;
    }
    button, a{
        cursor:  pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover{
        filter: brightness(0.9)
    }
`;