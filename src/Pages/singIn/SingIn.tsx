import React, { Fragment, useContext, Suspense } from "react";
import * as yup from "yup";
import { SignInProps } from "../../Contexts/Auth";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../Contexts/Auth";
import {
  Button,
  Container,
  CardContent,
  CardContentRadius,
  Form,
  Titulo,
  InputText,
  IconEmail,
  IconLock,
  Link,
  Row,
  CardCenter,
  Text,
  Column,
  IconApple,
  IconFacebook,
  IconGoogle,
  Img,
} from "remoteApp/Components";

export default function SingIn() {
  const { signIn } = useContext(AuthContext);

  const LoginFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Endereço de e-mail inválido")
      .required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = (val: SignInProps) => {
    let data = {
      email: val.email,
      password: val.password,
    };
    return signIn(data);
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      <Container bg="tertiary">
        <ToastContainer />

        <CardContentRadius
          containerSize="50%"
          contentSize="80%"
          bg="white"
          radius="right"
        >
          <Titulo title="LOGIN" center="center" font="secondary" size={40} />
          <Form onSubmit={handleSubmit} validationSchema={LoginFormSchema}>
            {(props, touched) => (
              <Fragment>
                <InputText
                  placeholder="Digite seu e-mail"
                  label="E-mail"
                  name="email"
                  errorMessage={props.errors.email}
                  startAdornment={<IconEmail size={19} />}
                  onChange={(e) => props.setFieldValue("email", e.target.value)}
                />

                <InputText
                  placeholder="Digite sua senha"
                  label="Password"
                  name="password"
                  type="password"
                  errorMessage={props.errors.password}
                  error={props.errors.email}
                  startAdornment={<IconLock size={19} />}
                  onChange={(e) =>
                    props.setFieldValue("password", e.target.value)
                  }
                />
                <Button children="Entrar" color="secondary" type="submit" />
              </Fragment>
            )}
          </Form>
          {/* <CardBetween>
              <InputCheckbox label="Lembrar senha" type="checkbox" />
              <Link to="/signup" title="Esqueci minha senha" />
            </CardBetween> */}
          <CardCenter bg="white">
            <Text text="Não tem uma conta?" font="secondary" />
            <Link
              to="/cadastrar"
              title="Cadastrar."
              size={20}
              font="secondary"
            />
          </CardCenter>
          <Row />

          <CardCenter>
            <Column>
              <Text text="Logar com" size={20} font="secondary" />
              <Row>
                <IconApple size="40" />
                <IconFacebook size="40" />
                <IconGoogle size="40" />
              </Row>
            </Column>
          </CardCenter>
        </CardContentRadius>

        <CardContent contentSize="100%" containerSize="70%" bg="tertiary">
          <Img src="sigin.png" alt="Imagem de fundo" width={350} height={300} />
        </CardContent>
      </Container>
    </Suspense>
  );
}
