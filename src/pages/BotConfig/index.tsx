
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import Swal from 'sweetalert2';
import { apiWhatsApp } from '../../services/apiWhatsApp';
import { AxiosError } from 'axios';

interface BotData {
    id: number;
    created_at: string;
    name: string;
    token: string;
    user_id?: number;
    instance_token_chatpro?: string;
    lixo: number;
    plataform?: string;
    api_key_openai?: string;
    provider_chatpro?: string;
    url_send?: string;
    status?: number;
    file_edition?: string;
    file_published?: string;
    files: any[]; // Aqui você pode definir um tipo mais específico para esse array se souber a estrutura dos objetos dentro dele
}
interface File {
    name: string;
}

export function BotConfig() {
    const { user }: any = useAuth();
    const { token }: any = useParams();
    const [bot, setBot] = useState<BotData | null>(null);
    const [name, setName] = useState("");
    const [plataform, setPlataform] = useState("");
    const [instance_token_chatpro, setInstance_token_chatpro] = useState("");
    const [provider_chatpro, setProviderChatpro] = useState("");
    const [url_send, setUrl_send] = useState("");
    const [buttonText, setButtonText] = useState("Salvar");
    const [buttonTextQrCode, setButtonTextQrCode] = useState("Criar Nova Sessão");
    const [buttonTextUpload, setButtonTextUpload] = useState("Upload de Arquivo");
    const [urlWebHook, setUrlWebhook] = useState('')
    const [files, setFiles] = useState<File[]>([]);
    const [newConfig, setNewConfig] = useState<any>({});
    const [gerandoQrCode, setGerandoQrCode] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [whatsAppConnected, setWhatsAppConnected] = useState('');


    const handleSave = async () => {
        // Aqui você pode enviar os dados do formulário para a API
        const data = {
            name,
            plataform,
            instance_token_chatpro,
            provider_chatpro,
            url_send
        }
        try {
            setButtonText('Salvando...')
            if (plataform != 'simple') {
                desconectarWhatsApp()
            }
            await api.post(`/bots/update/${token}`, data)
            setButtonText('Salvar')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Salvo com Sucesso!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (e) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Erro ao Salvar'",
                showConfirmButton: false,
                timer: 1500
            });
            console.log(e)
        }

    };

    const handleGenerateQR = async () => {
        // Aqui você pode implementar a lógica para gerar o QR code
        console.log("Gerar QR code");
        setButtonTextQrCode('Criando...')
        await apiWhatsApp.get(`/session/start/${token}`).then((data: any) => {
            buscandoQrCode()
        }).catch((err: AxiosError) => {
            if (err.response?.status == 422) {
                console.log('Aguardando Geracao de qr Code')
                buscandoQrCode()
            } else {
                console.log('Erro ao Iniciar Sessao')
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Estamos com Uma instabilidade em nossa Plataforma de conexao com WhatsApp.. por Favor Aguarde...",
                    showConfirmButton: false,
                    timer: 1500
                });
                return
            }
        })
    };

    const updateStatusWhatsApp = async () => {
        await apiWhatsApp.get(`/session/status/${token}`).then((data: any) => {
            if (data.data.message) {
                if (data.data.message == 'session_not_connected') {
                    buscandoQrCode()
                }
                setWhatsAppConnected(data.data.message)
            } else {
                console.log(data)
                setWhatsAppConnected('')
            }
        }).catch((err: AxiosError) => {
            console.log("Erro Ao Obter Status")
            setWhatsAppConnected('erro_ao_obter')
        })
    }
    const buscandoQrCode = async () => {
        updateStatusWhatsApp()
        setTimeout(async () => {
            await apiWhatsApp.get(`/session/qr/${token}`).then((data: any) => {
                if (data.data.qr) {
                    setQrCode(data.data.qr)
                    setButtonTextQrCode('Atualizar Qr')
                    setTimeout(async () => {
                        buscandoQrCode()
                    }, 30 * 1000)
                } else {
                    buscandoQrCode()
                }
            }).catch((err: AxiosError) => {
                setTimeout(async () => {
                    buscandoQrCode()
                }, 3 * 1000)
                console.log("Erro Ao Obter Qr Code")
            })

        }, 3 * 1000)
    }

    const desconectarWhatsApp = async () => {
        await apiWhatsApp.get(`/session/terminate/${token}`).then((data: any) => {
            setQrCode('')
            setWhatsAppConnected('session_not_found')
            setButtonTextQrCode('Gerar QR')
        }).catch((err: AxiosError) => {
            console.log("Erro Ao Deletar Sessao")
        })
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        const newFiles = e.dataTransfer.files;
        setFiles([...files, ...newFiles]);
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const config = JSON.parse(reader.result as string);
                setNewConfig(config);
            } catch (error) {
            }
        };
        reader.readAsText(file);
    };

    const handleUpload = async (e: any) => {
        setButtonTextUpload("Carregando...");
        if (Object.keys(newConfig).length === 0) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Voce precisa Carregar um Arquivo Json",
                showConfirmButton: false,
                timer: 1500
            });
            setButtonTextUpload("Upload de Arquivos");
            return
        }
        let result1 = await api.post(`files/update-file-config/${token}`, {
            filename: `${token}-file-config-edition.json`,
            data: newConfig
        })
        let result = await api.post(`files/update-file-config/${token}`, {
            filename: `${token}-file-config-published.json`,
            data: newConfig
        })
        console.log(result.config.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Atualizado com Sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
        setButtonTextUpload("Upload de Arquivos");
        return
    };
    useEffect(() => {
        async function getBot() {
            try {
                const response = await api.post(`/bots/find/${token}`);
                if (response.data) {
                    setBot(response.data.bots)
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
                        title: "Não Foi possivel encontrar a lista de Bots",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(error)
                }
            }
        }
        getBot()
    }, [token])
    useEffect(() => {
        if (bot) {
            setName(bot.name || '');
            setPlataform(bot.plataform || '');
            setInstance_token_chatpro(bot.instance_token_chatpro || '');
            setProviderChatpro(bot.provider_chatpro || '');
            setUrl_send(bot.url_send || '');
            if (bot.plataform == 'simple') {
                updateStatusWhatsApp()
            }
        }
    }, [bot, updateStatusWhatsApp]);

    useEffect(() => {
        const urlServelessBot = import.meta.env.VITE_URL_SERVELESS_BOT;
        const webHook = `${urlServelessBot}/${plataform}/new-message/${token}`
        setUrlWebhook(webHook)
    }, [plataform])

    useEffect(() => {
        console.log(qrCode)
    }, [qrCode])
    return (
        <Container>
            <Header />
            <Content>
                <h2>
                    Configuração do Bot
                </h2>
                <div>
                    <div className='col-4'>
                        <label>Nome:</label>
                        <input type='text' value={name} onChange={(e: any) => { setName(e.target.value) }} />
                    </div>
                    <div className='col-4'>
                        <label>token: </label>
                        <input type='text' value={token} disabled />
                    </div>
                    <div className='col-4'>
                        <label>Plataforma: </label>
                        <select value={plataform} onChange={(e: any) => { setPlataform(e.target.value) }}>
                            <option value=''>-</option>
                            <option value='simple'>SimpleBot</option>
                            <option value='chatpro'>ChatPro</option>
                            <option value='cdn'>CDN</option>
                            <option value='api'>API</option>
                        </select>
                    </div>
                    <div className='col-4'>
                        <label>Arquivo Configuração: </label>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            style={{ border: "5px dashed #ccc", padding: "50px", margin: "10px 10px 20px 10px", textAlign: 'center' }}
                        >
                            Solte seus arquivos aqui
                        </div>
                        <ul>
                            {files.map((file) => (
                                <li key={file.name}>{file.name}</li>
                            ))}
                        </ul>
                        <div className='col-12'>
                            <button onClick={(e: any) => { handleUpload(e) }}>{buttonTextUpload}</button>
                        </div>
                    </div>
                    <div className='col-4'>
                        {plataform == 'simple' ? (

                            whatsAppConnected === 'session_not_found' ? (
                                <div>
                                    <span>
                                        Usando essa função nós geramos um QR code, que você pode ler com seu celular, e uma API gratuita do WhatsApp Web JS. Nós a utilizamos para receber o webhook e assim manter uma comunicação entre seu WhatsApp e nosso Bot.
                                    </span>
                                    <div className='area-qrcode'></div>
                                    <button type='button' onClick={handleGenerateQR}>{buttonTextQrCode}</button>
                                </div>
                            ) :
                                whatsAppConnected === 'session_not_connected' ? (
                                    <div>
                                        <span>
                                            Usando essa função nós geramos um QR code, que você pode ler com seu celular, e uma API gratuita do WhatsApp Web JS. Nós a utilizamos para receber o webhook e assim manter uma comunicação entre seu WhatsApp e nosso Bot.
                                        </span>
                                        <div className='area-qrcode'>
                                            {qrCode !== '' && (
                                                <QRCode value={qrCode} style={{ textAlign: 'center' }} />
                                            )}

                                        </div>
                                        <button type='button' onClick={buscandoQrCode}>{buttonTextQrCode}</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button type='button' onClick={desconectarWhatsApp}>Desconectar WhatsApp</button>
                                    </div>
                                )
                        ) : plataform == 'chatpro' ? (
                            <div>
                                <span>
                                    Essa Função deve ser usada para integração com a plataforma do ChatPro (um sistema de multiAtendimento)
                                </span>
                                <div className='col-4'>
                                    <label>Token Instancia ChatPro: </label>
                                    <input type='text' value={instance_token_chatpro} onChange={(e: any) => { setInstance_token_chatpro(e.target.value) }} />
                                </div>
                                <div className='col-4'>
                                    <label>Provider (whatsapp/cloud) </label>
                                    <select value={provider_chatpro} onChange={(e: any) => { setProviderChatpro(e.target.value) }}>
                                        <option value=''>-</option>
                                        <option value='cloud'>Cloud</option>
                                        <option value='whatsapp'>whatsapp</option>
                                    </select>
                                </div>
                                <div className='col-4'>
                                    <label>Este é seu WebHook para Cadastro na Plataforma ChatPro: </label>
                                    <input type='text' value={urlWebHook} disabled />
                                </div>
                            </div>
                        ) : plataform == 'api' ? (
                            <div>
                                <span>
                                    Essa Função deve ser usada para integração com uma API, voce Cadastra o endere;o de endpoint aqui, e nosso webHook no sistema. Quando o WebHook e chamado, no bot recebe a mensagem, interpreta, realiza as a;'oes que deve realziar  e retorna a resposta na URL cadastrada aqui.
                                </span>
                                <div className='col-4'>
                                    <label>URL: </label>
                                    <input type='text' value={url_send} onChange={(e: any) => { setUrl_send(e.target.value) }} />
                                </div>
                                <div className='col-4'>
                                    <label>Este é seu WebHook para recebimento de mensagens: </label>
                                    <input type='text' value={urlWebHook} disabled />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <span>
                                    Usando essa funcao Voce consegue instalar o nosso plugin em seu site, e ter nosso chatbot em tempo real no seu site.
                                </span>
                                <h1>Ainda em Desenvolvimento...</h1>
                            </div>
                        )}
                    </div>
                    <button type='button' onClick={handleSave}>{buttonText}</button>
                </div>
            </Content>
        </Container >
    );
}