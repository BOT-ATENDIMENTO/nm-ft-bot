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
    margin: 1rem 10rem;
    @media screen and (max-width: 768px) {
        padding:0;
        margin:2rem;

  }
    a{
        color: ${({ theme }) => theme.COLORS.WHITE};;
    }
    a:hover{
        color:red
    }
    >div{
        height: 10rem;
        text-align: end;
        align-items: center;
        padding: 10px;
        >button{
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};;
            color: ${({ theme }) => theme.COLORS.WHITE};
            font-size: 25px;
            border-radius: 10px;
            width: 20rem;
            align-items: center;
            text-align: center;
        }
        >button:hover{
            background-color: ${({ theme }) => theme.COLORS.ORANGE};
            color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        }
    }
    svg{
    width: 30px;
    height: 30px;
    }
    >details{
        /* all:unset; */
        width: 100%;
        padding: 16px;
        color: rgb(255,255,255/.6);
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        border-radius: 10px;
        cursor: pointer;
        margin-bottom:16px;
        >summary{
            all: unset;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
            >div{
                display:flex;
                margin-right:10px;
                gap: 15px;
            }
            >svg{
                width: 18px;
                height: 18px;
            }
        }
        >ul{
            padding: 5px  0 0 16px;
            font-size: 0.8rem;
            list-style: none;
            >li{
                margin-top: 0.5rem;
                span{
                    margin-left: 15px;
                    font-size: 19px;
                }
                span:hover{
                    color: rebeccapurple;
                }   
            }
        }
    }

`;


