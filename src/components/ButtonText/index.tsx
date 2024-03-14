import { Container } from "./styles";

export function ButtonText({ title, isActive = false, ...rest }: any) {
    return (
        <Container type="button" isactive={isActive.toString()} {...rest}>
            {title}
        </Container>
    )
}