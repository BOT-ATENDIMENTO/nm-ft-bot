import { Container, Form, Avatar } from './styles'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera, FiPhone } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '../../hooks/auth'

export function Profile() {
    const { user }: any = useAuth();
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [telefone, setTelefone] = useState(user.telefone)
    const [password, setPassword] = useState(user.password)
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")


    return (
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </header>

            <Form>
                <Avatar>
                    <img src="https://github.com/renyzeraa.png" alt="Foto do usuário" />
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input id="avatar" type="file" />
                    </label>
                </Avatar>
                <Input type="text" placeholder="Nome" icon={FiUser} value={name} onChange={(e: any) => { setName(e.target.value) }} />
                <Input type="text" placeholder="E-mail" icon={FiMail} value={email} onChange={(e: any) => { setEmail(e.target.value) }} />
                <Input type="text" placeholder="Telefone" icon={FiPhone} value={telefone} onChange={(e: any) => { setTelefone(e.target.value) }} />
                <Input type="password" placeholder="Senha Atual" icon={FiLock} value={oldPassword} onChange={(e: any) => { setOldPassword(e.target.value) }} />
                <Input type="password" placeholder="Nova Senha" icon={FiLock} value={newPassword} onChange={(e: any) => { setNewPassword(e.target.value) }} />
                <Button title="Salvar"></Button>
            </Form>
        </Container>
    )
}