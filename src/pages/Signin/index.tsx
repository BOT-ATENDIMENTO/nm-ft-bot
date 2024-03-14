import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Background } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

export function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn }: any = useAuth()

  function handleSignIn() {
    signIn({ email, password })
  }
  return (
    <Container>
      <Form>
        <h1>AutoBots</h1>
        <p>Sistema De Autoatendimento Para WhatsApp</p>
        <h2>Faça seu login</h2>
        <Input placeholder="E-mail" type="text" icon={FiMail} onChange={(e: any) => setEmail(e.target.value)}></Input>
        <Input placeholder="Senha" type="password" icon={FiLock} onChange={(e: any) => setPassword(e.target.value)}></Input>
        <Button title="Entrar" onClick={handleSignIn}></Button>
        <Link to="/register" >Criar Conta</Link>
      </Form>
      <Background />
    </Container>
  )
}