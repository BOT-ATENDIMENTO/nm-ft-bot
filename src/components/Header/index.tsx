import { Link } from 'react-router-dom';
import { RiShutDownLine } from 'react-icons/ri';
import { Container, Head, Profile, Menu, Links, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

export function Header() {

    const { user, signOut }: any = useAuth();
    return (
        <Container>
            <Head>
                <Profile>
                    <img src="https://github.com/lRafaelOliveira.png" alt="User Image" />
                    <div>
                        <span>Bem-vindo</span>
                        <strong><Link to={'/profile'}>{user.name}</Link></strong>
                    </div>
                </Profile>
                <Logout onClick={signOut}>
                    <RiShutDownLine />
                </Logout>
            </Head>
            <Menu>
                <Links>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Bots'}>Bots</Link></li>
                    <li><Link to={'/configuration'}>Configurações</Link></li>
                </Links>
            </Menu>
        </Container>

    )
}