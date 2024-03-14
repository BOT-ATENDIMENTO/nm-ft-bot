import styled from 'styled-components'

export const Container = styled.div`
 grid-area: header;                                                                                                          
 display: flex;
 flex-direction: column;
`

export const Head = styled.header`
  height: 90px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;
  padding: 0 80px;
`
export const Profile = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > img:hover {
    transition: 0.4s;
    transform: scale(1.2);
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  strong {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 18px;
  }
`
export const Menu = styled.div`
    padding: 10px;
    margin-top: -4.2rem;
    margin-bottom: 2rem;
`;

export const Logout = styled.button`
  background: transparent;
  border: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 24px;
  }
`

export const Links = styled.ul`
    display: flex;
    justify-content:center;
    align-items: center;
    list-style: none;

    >li{
      margin-left: 16px;
      a{
          color: ${({ theme }) => theme.COLORS.WHITE};
      }
    }

    >li:hover, a:hover{
      font-weight: 900;
      color: ${({ theme }) => theme.COLORS.ORANGE};
      cursor: pointer;
    }
`;

