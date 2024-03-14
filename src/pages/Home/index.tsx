
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
export function Home() {
    return (
        <Container>
            <Header />
            <main>
                <Content>
                    <div>
                        Bots
                        
                    </div>
                    <div>
                        Contatos
                    </div>
                    <div>
                        Tickets
                    </div>
                    <div>
                        Plano
                    </div>
                    <div>
                        Resumo
                    </div>
                    <div>
                        Novidades
                    </div>
                </Content>
            </main>
        </Container>
    );
}