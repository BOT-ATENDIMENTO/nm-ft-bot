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
    display: flex;
    flex-direction: column;
    margin: 1rem 10rem;
    overflow-y: auto;

    >h2{
        text-transform: uppercase;
        border-bottom: 2px solid ${({ theme }) => theme.COLORS.ORANGE};
        margin-bottom: 2rem;
    }
    button{
        border-radius: 15px;
        padding:15px;
        width: 200px;
        background-color: ${({ theme }) => theme.COLORS.ORANGE};
        font-size: 20px;
    }

    >div{
        .col-4{
            display: flex;
            flex-direction: column;
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1000};
            border: 2px solid ${({ theme }) => theme.COLORS.BACKGROUND_800};
            border-radius: 10px;
            margin: 10px;
            padding: 5px;
            justify-content: center;
            >input, >select{
                border-radius: 10px;
                padding: 10px;
                width: 50%;
                margin-left: 2rem;
                background-color: #ccc;
                font-size: 15px;
            }
            span{
                display: block;
                font-size: 12px;
                text-align: center;
                color: ${({ theme }) => theme.COLORS.ORANGE};
            }
            >div{
                margin: auto;
                .area-qrcode{
                    margin: 20px auto 20px auto;
                    background-color: ${({ theme }) => theme.COLORS.WHITE};
                    border-radius: 10px;
                    width: 300px;
                    height: 300px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                >button{
                    display: block;
                    margin:  auto;
                    border-radius: 15px;
                    padding:15px;
                    width: 300px;
                    background-color: ${({ theme }) => theme.COLORS.ORANGE};
                    font-size: 20px;
                }
                
            }
        }
   
    }
`;


