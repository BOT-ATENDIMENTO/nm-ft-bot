
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { FiEdit, FiPlus, FiSettings, FiUsers } from 'react-icons/fi';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalCreateBot } from '../../components/ModalCreateBot';
import { useAuth } from '../../hooks/auth';
import Swal from 'sweetalert2';

export function Bots() {
    const { user }: any = useAuth();
    const [modalActive, setModalActive] = useState(false)
    const [limiteIsActive, setLimiteIsActive] = useState(false)
    const [bots, setBots] = useState([])
    const [qtdBots, setQtdBots] = useState(0)

    async function listBots() {
        try {
            const response = await api.post('/bots/findAll');
            if (response.data) {
                setBots(response.data.bots)
                setQtdBots(response.data.bots.length)
            }
            return response.data.bots

        } catch (error: any) {
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
                    title: "Não foi Possivel Listar os Bots",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error)
            }
        }
    }

    function handleModal() {
        setModalActive(true)
    }
    useEffect(() => {
        listBots()
        const maxBots = user.max_bots
        if (qtdBots >= maxBots) {
            setLimiteIsActive(true)
        }
    }, [qtdBots])
    return (
        <Container>
            <Header />
            {modalActive && (
                <ModalCreateBot isActive={modalActive} limiteIsActive={limiteIsActive} setModalActive={setModalActive} listBots={listBots} />
            )}
            <Content>
                <div>
                    <button onClick={handleModal}><FiPlus /> Novo</button>
                </div>
                {bots.map((item: any, index) => (
                    <details key={index}>
                        <summary>{item.name}
                            <div>
                                <Link to={`/contacts/${item.token}`}><FiUsers /></Link>
                                <Link to={`/fluxo-bot/${item.token}`}><FiEdit /></Link>
                                <Link to={`/bot/${item.token}`}><FiSettings /></Link>
                            </div>
                        </summary>
                        <ul>
                            <li>
                                <p>Status: <span>{item.status == 1 ? 'Ativo' : 'Atrasado'}</span></p>
                            </li>
                            <li>
                                <p>Nome: <span>{item.name}</span></p>
                            </li>
                            <li>
                                <p>Token: <span>{item.token}</span></p>
                            </li>
                            <li>
                                <p>Plataforma: <span>{item.plataform}</span></p>
                            </li>
                        </ul>
                    </details>
                ))}
            </Content>
        </Container>
    );
}