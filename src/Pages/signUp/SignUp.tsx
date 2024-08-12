import { Fragment, Suspense, useContext } from "react";
import { ToastContainer } from "react-toastify";
import {
  Button,
  CardCenter,
  CardContent,
  CardContentRadius,
  Container,
  Form,
  IconEmail,
  IconLock,
  IconPhone,
  IconUser,
  Img,
  InputText,
  Link,
  Row,
  Text,
  Titulo,
} from "remoteApp/Components";
import * as yup from "yup";
import { AuthContext, SignUpProps } from "../../Contexts/Auth";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const RegisterFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Endereço de e-mail inválido")
      .required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = (val: SignUpProps) => {
    let data = {
      email: val.email,
      password: val.password,
      phone: val.phone,
      name: val.name,
    };
    return signUp(data);
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      <Container bg="tertiary">
        <ToastContainer />
        <CardContent contentSize="100%" containerSize="70%" bg="tertiary">
          <Img src="sigin.png" alt="Imagem de fundo" width={350} height={300} />
        </CardContent>

        <CardContentRadius
          containerSize="50%"
          contentSize="80%"
          bg="white"
          radius="left"
        >
          <Titulo
            title="Crie sua conta"
            center="center"
            font="secondary"
            size={30}
          />
          <Form onSubmit={handleSubmit} validationSchema={RegisterFormSchema}>
            {(props, touched) => (
              <Fragment>
                <InputText
                  placeholder="Digite seu nome"
                  label="Nome"
                  name="name"
                  errorMessage={props.errors.name}
                  startAdornment={<IconUser size={20} />}
                  onChange={(e) => props.setFieldValue("name", e.target.value)}
                />
                <InputText
                  placeholder="Digite seu e-mail"
                  label="E-mail"
                  name="email"
                  errorMessage={props.errors.email}
                  startAdornment={<IconEmail size={20} />}
                  onChange={(e) => props.setFieldValue("email", e.target.value)}
                />

                <InputText
                  placeholder="Digite sua senha"
                  label="Password"
                  name="password"
                  type="password"
                  errorMessage={props.errors.password}
                  error={props.errors.password}
                  startAdornment={<IconLock size={20} />}
                  onChange={(e) =>
                    props.setFieldValue("password", e.target.value)
                  }
                />
                <InputText
                  placeholder="Telefone"
                  label="Telefone"
                  name="phone"
                  type="number"
                  errorMessage={props.errors.phone}
                  error={props.errors.phone}
                  startAdornment={<IconPhone size={20} />}
                  onChange={(e) => props.setFieldValue("phone", e.target.value)}
                />
                <Button children="Cadastrar" color="secondary" type="submit" />
              </Fragment>
            )}
          </Form>
          {/* <CardBetween>
              <InputCheckbox label="Lembrar senha" type="checkbox" />
              <Link to="/signup" title="Esqueci minha senha" />
            </CardBetween> */}
          <CardCenter bg="white">
            <Text text="Já tem uma conta?" />
            <Link to="/signup" title="Login" font="secondary" />
          </CardCenter>
          <Row />
        </CardContentRadius>
      </Container>
    </Suspense>
  );
}
