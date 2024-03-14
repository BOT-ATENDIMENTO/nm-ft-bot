import { Container } from './styles'

export function Button({ title, loading = false, ...rest }: any) {
    return (
        <Container type="button" disabled={loading} {...rest}>
            {loading ? 'Carregando...' : title}
        </Container>
    )
}