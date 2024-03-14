import { Container, Form, Background } from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { useState } from 'react';
import { api } from '../../services/api';
import Swal from 'sweetalert2';

export function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefone, setTelefone] = useState("");
    const navigate = useNavigate();

    function handleSignUp() {
        if (!nome || !email || !password || !telefone) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Preencha todos os Campos",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }
        const user = api.post('/users/create', {
            "name": nome,
            "email": email,
            "password": password,
            "telefone": telefone
        }).then(() => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Usuario Cadastrado Com Sucesso!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login')
        }).catch((error) => {
            if (error.response) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Nao foi Possivel Cadastrar.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    return (
        <Container>
            <Background />
            <Form>
                <h1>AutoBots</h1>
                <p>Sistema De Autoatendimento Para WhatsApp</p>
                <h2>Crie Sua Conta</h2>
                <Input placeholder="Nome" type="text" icon={FiUser} onChange={(e: any) => { setNome(e.target.value) }}></Input>
                <Input placeholder="E-mail" type="text" icon={FiMail} onChange={(e: any) => { setEmail(e.target.value) }}></Input>
                <Input placeholder="Senha" type="password" icon={FiLock} onChange={(e: any) => { setPassword(e.target.value) }}></Input>
                <Input placeholder="Telefone" type="text" icon={FiPhone} onChange={(e: any) => { setTelefone(e.target.value) }}></Input>
                <Button title="Cadastrar" onClick={handleSignUp}></Button>
                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container >
    )
}