import { useCallback, useState, useEffect } from 'react';
import { Connection, addEdge, useEdgesState, useNodesState, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { Node, NodeChange, EdgeChange, MarkerType } from 'reactflow';
import getFileConfig from '../../hooks/getFileConfiguration';
import { FiPlus, FiSettings, FiBookOpen, FiUploadCloud, FiSave, FiCoffee } from "react-icons/fi"
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { FluxoBotComponent } from '../../components/FluxoBotComponent';
import { MenuFluxoLateral } from '../../components/MenuFLuxoLateral';
import { Loading } from '../../components/Loading';

import { MenuFLuxoConfig } from '../../components/MenuFLuxoConfig';
import { Square } from '../../components/FluxoBotComponent/nodes/Square';
import { DefautEdge } from '../../components/FluxoBotComponent/edges/DefautEdge';
import { transformConfigInNode } from '../../hooks/transformConfigInNode';
import { useParams } from 'react-router-dom';
import { MenuFLuxoTop } from '../../components/MenuFLuxoTop';
import { api } from '../../services/api';
import { Container, Content, ContentUseAI, ContainerCard, Title, Subtitle, ContentConfiguracoes, ContentVariaveis, TableVariables } from './styles';
import { Button } from '../../components/Button';
import Switch from '../../components/Switch';
import Swal from 'sweetalert2';

const NODE_TYPES = {
    square: Square,
}

const EDGE_TYPES = {
    default: DefautEdge
}

type FileEditionType = {
    data: {
        language: string;
        greetings: string;
        token_bot: string;
        plataform: string;
        maxErrors: number;
        config_plataform: any[];
        configurations: {
            endTimeSessionRedis: number;
            timeAwaitSendMessage: number;
            use_openai: boolean;
        };
        use_openai_config: {
            ai_selected: string;
            name_ai: string;
            key: string;
            prompt: string;
        }
        conditions: any[];
        intentions: any;
        variables: any;
        nodes: any[];
    };
}

type useAIConfigType = {
    ai_selected?: string;
    name_ai?: string;
    key?: string;
    prompt?: string;
}

interface Variaveis {
    [key: string]: string;
}

export function FluxoBot() {
    const { token } = useParams();
    const [edges, setEdges] = useEdgesState([]);
    const [nodes, setNodes] = useNodesState([]);
    const [fileEdition, setFileEdition] = useState<any>(null);
    const [filePublished, setFilePublished] = useState<any>(null);
    const [openConfigs, setopenConfigs] = useState(false);
    const [idselected, setIdselected] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [useAI, setUseAi] = useState(false);
    const [useAIConfig, setUseAiConfig] = useState<useAIConfigType | undefined>(undefined);
    const { data, loading, error } = getFileConfig(token);
    const [visualizando, setVisualizando] = useState('fluxo');
    const [variables, setVariables] = useState<Variaveis>({})
    const [novaChave, setNovaChave] = useState('');
    const [nodeReact, setNodeReact] = useState({});


    const onConnect = useCallback((connection: Connection) => {
        return setEdges((edges: any) => addEdge(connection, edges))
    }, [])

    function addSquareNode() {
        let idNode = crypto.randomUUID()
        let newNode = {
            id: idNode,
            type: 'square',
            position: {
                x: 750,
                y: 350,
            },
            data: {
                label: "Novo bloco",
            },
        }
        setNodes(nodes => [
            ...nodes,
            newNode
        ])
        setFileEdition((prevFileEdition: any) => ({
            ...prevFileEdition,
            nodes: {
                ...prevFileEdition.nodes,
                [idNode]: {
                    id: idNode,
                    save_response: false,
                    type: "text",
                    name: "",
                    actions: {
                        entry_actions: [],
                        exit_actions: []
                    },
                    conditions: {},
                    text: "",
                    next: ""
                }
            }
        }));

    }

    function openConfig(event: any, node: Node) {
        if (node) {
            setNodeReact(node)
            const nodeId = node.id;
            if (nodeId) {
                const newProps = {
                    style: { strokeWidth: 2, stroke: '#FF9000' },
                    markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30, color: '#FF9000' } // Nova configuração para markerEnd
                };
                updateEdgeProperties(nodeId, newProps);
                if (openConfigs) {
                    setIdselected(nodeId)
                } else {
                    setopenConfigs(true)
                    setIdselected(nodeId)
                }
            } else {
                setopenConfigs(false)
                setIdselected('')
            }
        } else {
            console.log('node undefined')
        }


    }

    function updateEdgeProperties(targetId: any, newProps: any) {
        setEdges(prevEdges => (
            prevEdges.map(edge => {
                if (edge.source === targetId) {
                    return { ...edge, ...newProps };
                } else {
                    const { markerEnd, style, ...rest } = edge;
                    return rest;
                }
            })
        ));
    }

    const saveConfig = async (published: boolean = false) => {
        try {
            setCarregando(true)
            // atualizando Variables
            const updatedConfig = { ...fileEdition };
            updatedConfig.variables = variables;
            const data = {
                type: 'edition',
                data: updatedConfig
            }
            await api.post(`/files/update-file-config/${token}`, data)
            setFileEdition(updatedConfig)
            setCarregando(false);
        } catch (e) {
            setCarregando(false)
            console.log("Error", e)
        }
    }

    const onNodesChange = useCallback(
        (changes: NodeChange[] | any) => {
            changes.forEach((change: any) => {
                if (change.position) {
                    const idNode = change.id
                    const updatedNode = change.position;
                    setFileEdition((prevFileEdition: any) => ({
                        ...prevFileEdition,
                        nodes: {
                            ...prevFileEdition.nodes,
                            [idNode]: {
                                ...prevFileEdition.nodes[idNode],
                                id: idNode,
                                positions: {
                                    x: updatedNode.x,
                                    y: updatedNode.y
                                }
                            }
                        }
                    }));

                }
            });
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const handlePromptIA = (valor: any, chave: string) => {
        const updatedConfig = { ...fileEdition };
        updatedConfig.use_openai_config = { ...updatedConfig.use_openai_config };
        updatedConfig.use_openai_config[chave] = valor;
        setFileEdition(updatedConfig)
        setUseAiConfig(updatedConfig.use_openai_config)
    };

    const handleConfigurations = (valor: any, chave: string) => {
        const updatedConfig = { ...fileEdition };
        updatedConfig.configurations = { ...updatedConfig.configurations };
        updatedConfig.configurations[chave] = valor;
        setFileEdition(updatedConfig)
    };

    const ativarDesativarIa = async (checked: boolean) => {
        if (checked) {
            setCarregando(true);
            const updatedConfig = { ...fileEdition };
            updatedConfig.configurations.use_openai = true;
            setFileEdition(updatedConfig)
            const data = {
                type: 'edition',
                data: updatedConfig
            }
            await api.post(`/files/update-file-config/${token}`, data)
            setUseAi(true);
            setCarregando(false);
            setVisualizando('useAi')
        } else {
            setCarregando(true);
            const updatedConfig = { ...fileEdition };
            updatedConfig.configurations.use_openai = false;
            setFileEdition(updatedConfig)
            const data = {
                type: 'edition',
                data: updatedConfig
            }
            await api.post(`/files/update-file-config/${token}`, data)
            setUseAi(false);
            setCarregando(false);
            setVisualizando('fluxo')

        }
    }

    const handleChangeVariables = (chaveAntiga: string, novaChave: string, novoValor: string) => {
        const novasVariaveis = { ...variables };
        delete novasVariaveis[chaveAntiga];
        novasVariaveis[novaChave] = novoValor;
        setVariables(novasVariaveis);
    };

    const handleAddVariable = () => {
        if (novaChave.trim() !== '') {
            const novasVariaveis = { ...variables };
            novasVariaveis[novaChave] = '';
            setVariables(novasVariaveis);
            setNovaChave('');
        }
    };

    const publicFile = () => {
        Swal.fire({
            title: "Tem Certeza que deseja publicar esta Edição?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não Salvar`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setCarregando(true)
                await api.post(`/files/public-file/${token}`, { type: ''})
                setFilePublished(fileEdition)
                setCarregando(false)
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    useEffect(() => {
        console.log('atualizou File Edition')
        if (fileEdition && Object.keys(fileEdition).length > 0) {
            if (fileEdition && fileEdition && fileEdition.variables) {
                const variaveis = Object.fromEntries(Object.entries(fileEdition.variables));
                setVariables(variaveis as Variaveis);
            }
            setUseAi(fileEdition.configurations.use_openai);
            if (fileEdition.configurations.use_openai) {
                setUseAiConfig(fileEdition.use_openai_config)
                setVisualizando('useAi')
            }


            let [newNodes, newEdges] = transformConfigInNode(fileEdition.nodes)
            if (newNodes) {
                setNodes(newNodes)
            }
            if (newEdges) {
                setEdges(newEdges)
            }
        }
    }, [fileEdition])

    useEffect(() => {
        if (data?.fileEdition) {
            setFileEdition(data.fileEdition)
        }
        setCarregando(loading)
    }, [data]);

    useEffect(() => {
        // console.log(useAI)
    }, [useAI, useAIConfig]);

    return (
        <Container>
            <Header />
            {carregando ? (
                <Loading />
            ) : (
                <Content>
                    <MenuFluxoLateral>
                        <ul>
                            {useAI && (<li onClick={() => setVisualizando('useAi')}><FiCoffee /></li>)}
                            {!useAI && (<li onClick={() => { setVisualizando('fluxo'); addSquareNode(); }}><FiPlus /></li>)}
                            <li onClick={() => setVisualizando('configuracoes')}><FiSettings /></li>
                            <li onClick={() => setVisualizando('variaveis')}><FiBookOpen /></li>
                            <li onClick={() => publicFile()}><FiUploadCloud /></li>
                        </ul>
                    </MenuFluxoLateral>
                    {visualizando == 'fluxo' ? (
                        <FluxoBotComponent NODE_TYPES={NODE_TYPES} EDGE_TYPES={EDGE_TYPES} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodesChange={onNodesChange} nodes={nodes} edges={edges} openConfig={openConfig}>
                            <MenuFLuxoTop>
                                <ul>
                                    <li onClick={() => { saveConfig() }}><FiSave /></li>
                                </ul>
                            </MenuFLuxoTop>
                            {idselected != '' ? (
                                <MenuFLuxoConfig idNode={idselected} openConfigs={openConfigs} setopenConfigs={setopenConfigs} fileEdition={fileEdition} setFileEdition={setFileEdition} nodeReact={nodeReact} setNodeReact={setNodeReact} edges={edges} setEdges={setEdges}>
                                    Teste
                                </MenuFLuxoConfig>
                            ) : (
                                <>
                                </>
                            )}
                        </FluxoBotComponent>
                    ) : (visualizando == 'useAi' ? (
                        <ContentUseAI>
                            <ContainerCard>
                                <div className='box1'>
                                    <Title>Qual IA Deseja Usar?</Title>
                                    <Subtitle>
                                        Atualmente temos duas Opções para voce poder utilizar. OpenAi e Gemini. Ambas IA funcionam da mesma maneira.
                                    </Subtitle>
                                </div>
                                <div className='box2'>
                                    <select onChange={(e) => handlePromptIA(e.target.value, 'ai_selected')} value={useAIConfig?.ai_selected}>
                                        <option value={'-'}>-</option>
                                        <option value={'gemini'} >Gemini</option>
                                        <option value={'openai'} >OpenAI</option>
                                    </select>
                                </div>
                            </ContainerCard>
                            <ContainerCard>
                                <div className='box1'>
                                    <Title>Qual TOKEN da IA</Title>
                                    <Subtitle>

                                    </Subtitle>
                                </div>
                                <div className='box2'>
                                    <input type='text' value={useAIConfig && useAIConfig.key} onChange={(e) => handlePromptIA(e.target.value, 'key')} />
                                </div>
                            </ContainerCard>
                            <ContainerCard>
                                <div className='box1'>
                                    <Title>Prompt</Title>
                                </div>
                                <div className='box3'>
                                    <textarea rows={20} onChange={(e) => handlePromptIA(e.target.value, 'prompt')} value={useAIConfig && useAIConfig.prompt}>
                                        {useAIConfig && useAIConfig.prompt}
                                    </textarea>
                                </div>
                            </ContainerCard>
                            <ContainerCard>
                                <div className='box2'>
                                    <Button title={'Salvar'} onClick={saveConfig}></Button>
                                </div>
                            </ContainerCard>
                        </ContentUseAI>
                    ) : (visualizando == 'variaveis' ? (
                        <ContentVariaveis>
                            <TableVariables>
                                <thead>
                                    <tr>
                                        <th>CHAVE</th>
                                        <th>VALOR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(variables).map(([chave, valor]) => (
                                        <tr key={chave}>
                                            <td><input type="text" value={chave} onChange={(e) => handleChangeVariables(chave, e.target.value, valor)} /></td>
                                            <td><input type="text" value={valor} onChange={(e) => handleChangeVariables(chave, chave, e.target.value)} /></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td><input type="text" value={novaChave} onChange={(e) => setNovaChave(e.target.value)} placeholder="Nova Chave" /></td>
                                        <td><button onClick={handleAddVariable}>Adicionar Nova Variável</button></td>
                                    </tr>
                                </tbody>
                            </TableVariables>
                        </ContentVariaveis>
                    ) : (visualizando == 'configuracoes' ? (
                        <ContentConfiguracoes>
                            <ContainerCard>
                                <div className='box1'>
                                    <Title>Tempo Máximo de Sessão</Title>
                                    <Subtitle>Tempo maximo que o bot mantem a sessao aberta em segundos.</Subtitle>
                                </div>
                                <div className='box2'>
                                    <input type='text' value={useAIConfig && fileEdition.configurations.endTimeSessionRedis} onChange={(e) => handleConfigurations(e.target.value, 'endTimeSessionRedis')} />
                                </div>
                            </ContainerCard>
                            <ContainerCard>
                                <div className='box1'>
                                    <Title>Tempo de Delay no Envio de mensagem</Title>
                                    <Subtitle>Tempo de espera para o bot enviar mensagens em segundos.</Subtitle>
                                </div>
                                <div className='box2'>
                                    <input type='text' value={useAIConfig && fileEdition.configurations.timeAwaitSendMessage} onChange={(e) => handleConfigurations(e.target.value, 'timeAwaitSendMessage')} />
                                </div>
                            </ContainerCard>
                            <ContainerCard>
                                <div className='box1'>
                                    <Title>Usar Inteligencia Artificial</Title>
                                    <Subtitle>
                                        <p>Usar inteligencia Artifical e criar um atendimento personalizado</p>
                                        <p>Plataformas suportadas até o momento: GEMINI & OPENAI</p>
                                        <p>Ativando esta Opção, o fluxo desenhado anteriormente não terá valor, e apenas o prompt aqui configurado terá influencia.</p>
                                    </Subtitle>
                                </div>
                                <div className='box3'>
                                    <h2>Ligar/Desligar</h2>
                                    <Switch onChange={ativarDesativarIa} checking={useAI} />
                                </div>
                            </ContainerCard>
                        </ContentConfiguracoes>
                    ) : (
                        <div>Nada Selecionado</div>
                    ))))}
                </Content>
            )}
            <Footer />
        </Container>
    );
}
