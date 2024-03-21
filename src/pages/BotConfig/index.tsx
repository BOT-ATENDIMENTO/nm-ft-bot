
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
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
    const [textUploadFile, setTextUploadFile] = useState("Solte seus arquivos aqui");
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
        setButtonTextQrCode('Criando...')
        await apiWhatsApp.get(`/session/start/${token}`).then(async (data: any) => {
            if (data.data.success) {
                await buscandoQrCode()
            }
        }).catch(async (err: AxiosError) => {
            if (err.response?.status == 422) {
                await buscandoQrCode()
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
        setQrCode("")
        const intervalId = setInterval(async () => {
            await apiWhatsApp.get(`/session/status/${token}`).then(async (data: any) => {
                if (data.data.message) {
                    setWhatsAppConnected(data.data.message)
                    if (data.data.message == 'session_not_connected') {
                        setButtonTextQrCode('Gerando Qr...')
                        buscandoQrCode()
                    } else if (whatsAppConnected == "session_connected") {
                        setButtonTextQrCode("Conetado")
                        setQrCode("")
                        clearInterval(intervalId); // Para o intervalo após encontrar o QR code
                    }
                } else {
                    console.log(data)
                    setWhatsAppConnected('erro_ao_obter')
                }
            }).catch((err: AxiosError) => {
                console.log("Erro Ao Obter Status", err)
                setWhatsAppConnected('erro_ao_obter')
            })
        }, (3 * 1000)); // Verifica a cada 30 segundos
    }


    const buscandoQrCode = (): Promise<void> => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const response = await apiWhatsApp.get(`/session/qr/${token}`);
                if (response.data.qr) {
                    if (whatsAppConnected != "session_connected") {
                        setQrCode(response.data.qr);
                        setButtonTextQrCode('Atualizar Qr');
                        resolve(); // Resolve a Promise após encontrar o QR code
                    }
                } else {
                    setWhatsAppConnected(response.data.message)
                    if (response.data.message == "session_not_found") {
                        setButtonTextQrCode('Nova Sessão')
                    }
                }
            } catch (err) {
                console.log("Erro Ao Obter Qr Code", err);
                reject(err); // Rejeita a Promise em caso de erro
            }
        });
    };

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
                setTextUploadFile(file.name)
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
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Atualizado com Sucesso!",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.reload();
        });
        setButtonTextUpload("Upload de Arquivos");
        return
    };
    const handleDownloadFile = async (e: any) => {
        try {
            const response = await api.post(`/files/get-file-config/${token}`);
            const json = response.data.data
            // Criar um Blob a partir do JSON
            const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
            // Criar um link para o Blob e simular o clique para iniciar o download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.json';
            a.click();

            // // Limpar o objeto URL criado após o download
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao baixar o arquivo JSON:', error);
            // Trate o erro conforme necessário
        }
    }

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
    }, [bot]);
    useEffect(() => {
        const urlServelessBot = import.meta.env.VITE_URL_SERVELESS_BOT;
        const webHook = `${urlServelessBot}/${plataform}/new-message/${token}`
        setUrlWebhook(webHook)
    }, [plataform])

    useEffect(() => {
        // console.log(qrCode)
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
                        <details>
                            <summary><label>Arquivo Configuração: </label>
                            </summary>
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                style={{ border: "5px dashed #ccc", padding: "50px", margin: "10px 10px 20px 10px", textAlign: 'center' }}
                            >
                                {textUploadFile}
                            </div>
                            <div className='col-12' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <button onClick={(e: any) => { handleUpload(e) }}>{buttonTextUpload}</button>
                                <button onClick={(e: any) => { handleDownloadFile(e) }}>Download do Arquivo</button>
                            </div>
                        </details>
                    </div>
                    <div className='col-4'>
                        {plataform == 'simple' ? (
                            whatsAppConnected === 'session_not_found' ? (
                                <div>
                                    <span>
                                        Usando essa função nós geramos um QR code, que você pode ler com seu celular, e uma API gratuita do WhatsApp Web JS. Nós a utilizamos para receber o webhook e assim manter uma comunicação entre seu WhatsApp e nosso Bot.
                                    </span>
                                    <button type='button' onClick={handleGenerateQR}>{buttonTextQrCode}</button>
                                </div>
                            ) : whatsAppConnected === 'session_not_connected' ? (
                                <div>
                                    <span>
                                        Usando essa função nós geramos um QR code, que você pode ler com seu celular, e uma API gratuita do WhatsApp Web JS. Nós a utilizamos para receber o webhook e assim manter uma comunicação entre seu WhatsApp e nosso Bot.
                                    </span>
                                    <div className='area-qrcode'>
                                        {qrCode !== '' && (
                                            <QRCodeSVG value={qrCode} style={{ textAlign: 'center', width: '95%', height: '95%' }} width={100} height={100} />
                                        )}

                                    </div>
                                    <button type='button' onClick={buscandoQrCode}>{buttonTextQrCode}</button>
                                </div>
                            ) : whatsAppConnected === 'session_connected' ? (
                                <div>
                                    <button type='button' onClick={desconectarWhatsApp}>Desconectar</button>
                                </div>
                            ) : (
                                <div>
                                    <button type='button'>Carregando...{whatsAppConnected}</button>
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