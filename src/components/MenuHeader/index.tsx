import { Container, Links } from './styles'

export function MenuHeader({ }: any) {
    return (
        <Container>
            <Links>
                <li>Fluxo Bot</li>
                <li>Contatos</li>
                <li>Configurações</li>
            </Links>
        </Container>
    )
}