import { on } from "events";
import { useFormik } from "formik";
import React, { FormEvent, Fragment, useContext } from "react";
import { Suspense, lazy } from "react";
import { SignInProps, useAuth } from "../../hooks/Auth";
import {
  Button,
  Container,
  CardContent,
  Form,
  Titulo,
  InputText,
  IconEmail,
  IconLock,
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
  Img,
} from "remoteApp/Components";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../hooks/Auth";
export default function SingIn() {
  // const { signIn } = useContext(updateProfile);
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
      <Container>
        <ToastContainer />
        <CardContent containerSize="50%" contentSize="80%" bg="primary">
          <Titulo title="LOGIN" center="center" />
          <Form onSubmit={handleSubmit} validationSchema={LoginFormSchema}>
            {(formikProps) => (
              <Fragment>
                <InputText
                  placeholder="Email"
                  label="E-mail"
                  name="email"
                  errorMessage={formikProps.errors.password}
                  startAdornment={<IconEmail />}
                  onChange={(e) =>
                    formikProps.setFieldValue("email", e.target.value)
                  }
                />

                <InputText
                  placeholder="Password"
                  label="Password"
                  name="password"
                  type="password"
                  errorMessage={formikProps.errors.password}
                  error={formikProps.errors.email}
                  startAdornment={<IconLock />}
                  onChange={(e) =>
                    formikProps.setFieldValue("password", e.target.value)
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
          <CardCenter bg="primary">
            <Text text="Não tem uma conta?" />
            <Link to="/signup" title="Cadastrar" />
          </CardCenter>
          <Row />

          <CardCenter>
            <Column>
              <Text text="Logar com" size={20} />
              <Row>
                <IconApple size="40" />
                <IconFacebook size="40" />
                <IconGoogle size="40" />
              </Row>
            </Column>
          </CardCenter>
        </CardContent>

        <CardContent contentSize="100%" containerSize="70%" bg="secondary">
          <Img src="sigin.png" alt="Imagem de fundo" width={350} height={300} />
        </CardContent>
      </Container>
    </Suspense>
  );
}
