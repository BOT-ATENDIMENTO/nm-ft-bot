import React from "react";
import { Suspense, lazy } from "react";
import {
  Button,
  Container,
  CardContent,
  Form,
  Titulo,
  InputText,
  IconFaUser,
  IconKey,
  CardBetween,
  InputCheckbox,
  Link,
  Row,
  CardCenter,
  Text,
  Column,
  IconApple,
  IconFacebook,
  IconGoogle,
  Image,
} from "remoteApp/Button";
// const Button = lazy(() => import("remoteApp/Button"));

export default function SingIn() {
  function handleSignIn() {
    console.log("Logando...");
  }
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Container>
        <CardContent containerSize="50%" contentSize="80%">
          <form>
            <Titulo title="LOGIN" center="center" />
            <InputText
              placeholder="Email"
              label="E-mail"
              // startAdornment={<IconFaUser />}
            />
            <InputText
              placeholder="Password"
              label="Password"
              // startAdornment={<IconKey />}
            />

            <CardBetween>
              <InputCheckbox label="Lembrar senha" type="checkbox" />
              <Link to="/signup" title="Esqueci minha senha" />
            </CardBetween>
            <Row />
            <Button children="Entrar" onClick={handleSignIn} />

            <CardCenter>
              <Text text="Não tem uma conta?" />
              <Link to="/signup" title="Cadastrar" />
            </CardCenter>

            <CardCenter>
              <Text text="Logar com" size={20} />

              {/* <IconApple size="40" />
                  <IconFacebook size="40" />
                  <IconGoogle size="40" /> */}
            </CardCenter>
          </form>
        </CardContent>

        <CardContent
          contentSize="100%"
          containerSize="70%"
          color="blue"
        ></CardContent>
      </Container>
    </Suspense>
  );
}
