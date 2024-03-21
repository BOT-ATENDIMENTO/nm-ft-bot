import styled from "styled-components";

type ContainerProps = {
    $openconfigs: string;
    // outras propriedades se houver
};


export const Container = styled.div<ContainerProps>`
    position: fixed;
    display:  ${(props) => (props.$openconfigs == 'true' ? 'flex' : 'none')};
    justify-content: center;
    align-content: center;
    align-items: center;
    right: .1rem;
    top: 9.5rem;
    width: 25.5rem;
    height: 78%;
    background-color:${({ theme }) => theme.COLORS.BACKGROUND_1000};
    border-radius: 10px 10px 0 0;
    z-index: 2;
    @media screen and (max-width: 768px) {
        width: 95vw;
        padding:0;

  }

    .area-menu{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: -80px;
        >ul{
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            min-height: 4rem;
            overflow-x: initial;
            border-radius: 10px;
            width: 95%;
            .active{
                    color: #551A8B;
                    text-decoration: underline;
                }
            >li{
                display:flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                font-size: 10px;
                padding: 10px;
                >svg{
                    width: 2rem;
                    height: 2rem;
                }
            
            }
            >li:hover{
                color: #551A8B;
            }
        }
    }


`

export const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1px;
  >svg{
    position: absolute;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    top: 0px;
    left: 0px;
    cursor: pointer;
  }
`;

export const Header = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1000};
  border-radius: 10px 10px 0 0 ;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  border-bottom: 2px solid ${({ theme }) => theme.COLORS.BLACK_300};
    >p{
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1000};
        height: 50%;
        border-radius: 10px;
        margin-left: 40px;
        margin-top: 15px;
    }

  >input{
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1000};
    height: 50%;
    border-radius: 10px;
    margin-left: 20px;
    color: ${({ theme }) => theme.COLORS.SUPER_WHITE};
    padding-left: 15px;
  }
  >div>svg{
    width: 20px;
    height: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
`;

export const Main = styled.div`
    width: 100%;
    height: auto;
    min-height: 90%;
    overflow-y: auto;

    .message-from{
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_1000};
        border-radius: 0px 10px 10px 10px;
        width: 90%;
        padding: 15px;
        margin: 10px;
    }
`;

export const Menu = styled.div`
    width: 100%;
    min-height: 5%;
    overflow-y: auto;
    margin-top: 10px;
    >ul{
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        .active{
                color: #551A8B;
                text-decoration: underline;
            }
        >li{
            cursor: pointer;
           
        }
        >li:hover{
            color: #551A8B;
        }
    }
`;

export const Conteudo = styled.div`
    display:block;
    background-color: ${({ theme }) => theme.COLORS.BLACK_300};
    min-height: 93%;
    overflow-y: auto;
    .area-texto{
        display: block;
        padding:15px;
        min-height: 350px;
        >textarea{
            margin-top: 50px;
            height: auto;
            background-color: #ccc;
            padding: 15px;
            border-radius: 15px 0 15px 15px;
            width: 100%;
            color:${({ theme }) => theme.COLORS.BLACK_300};
            resize: none;
        }

        >.area-options{
            margin-top: 30px;
            border-radius: 10px;
            overflow-y: auto;
            height: 20rem;
            >div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
                border-radius: 10px;
                height: 7rem;
                margin: auto;
                margin-bottom: 5px;
                padding: 1px;
                padding-top: 25px;
                gap: 0.2rem;
                >input{
                    width: 90%;
                    padding: 10 px;
                    padding-left: 15px;
                    border-radius: 10px 10px 10px 10px;
                }
                >select{
                    width: 90%;
                    padding: 10px;
                }
                >.span-footer{
                    display: block;
                    text-align: center;
                    width: 100%;
                    z-index: 10;
                    >svg{
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                    }
                    >svg:hover{
                        color: ${({ theme }) => theme.COLORS.ORANGE};
                    }
                }
            }
        }
    }
  
    .footer{
        position: absolute;
        width: 100%;
        min-height: 2.5rem;
        margin-top: 15%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        >svg{
            width: 30px;
            height:30px;
            padding: 5px;
            border-radius: 5px;
        }
        >svg:hover{
            cursor: pointer;
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        }
    }
 
`;
export const Condicao = styled.div`
    background-color: blue;
    min-height: 93%;
    overflow-y: auto;
`;
export const Acao = styled.div`
    background-color: green;
    min-height: 93%;
    overflow-y: auto;
`;