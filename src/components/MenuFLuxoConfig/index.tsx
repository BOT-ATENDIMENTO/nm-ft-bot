import { useEffect, useState, useRef } from 'react';
import { Container, Card, Header, Main, Menu, Conteudo, Condicao, Acao } from './styles';
import { FiX, FiEdit, FiCheck, FiMessageCircle, FiMessageSquare, FiTrello, FiServer, FiImage, FiPlayCircle, FiUpload, FiPlusCircle } from 'react-icons/fi';

type MenuFLuxoConfigProps = {
    idNode: string;
    openConfigs: boolean;
    setopenConfigs: any;
    fileConfig: any;
    setFileConfig: any;
    children: React.ReactNode;
    nodeReact: any;
    setNodeReact: any;
    edges: any;
    setEdges: any
};

type Action = {
    id_action: string;
    action: string;
    when?: string;
    args?: {
        department_id?: string;
        key?: string;
        value?: string;
        close_tag?: string;
        link?: string;
        name?: string;
        telefone?: string;
        next?: string;
    };
    err?: string;
}

type Actions = {
    entry_actions?: Action[];
    exit_actions?: Action[];
}

type nodeProps = {
    id?: string;
    name?: string;
    save_response?: boolean | string;
    type?: string;
    text: string;
    next?: string;
    actions?: Actions;
    options?: Array<OptionsProps>;
    conditions?: any;
    end?: string;
};

type conditionsProps = {
    action: Action;
    args: [{
        comparison?: string;
        key?: string;
        value?: string;
    }];
    source?: string;
}


type OptionsProps = {
    id: string;
    view_id: boolean;
    name: string;
    save_response: string | boolean;
    view: boolean,
    text: string,
    intentions: any[];
    actions: {
        entry_actions: any[];
        exit_actions: any[];
    };
    next: string;
    err: string;
};


export function MenuFLuxoConfig({ idNode, openConfigs = false, setopenConfigs, fileConfig, setFileConfig, nodeReact, setNodeReact, edges, setEdges }: MenuFLuxoConfigProps) {
    const [editandoNome, setEditandoNome] = useState(false);
    const [menuSelected, setmenuSelected] = useState('conteudo');
    const [NodeSelected, setNodeSelected] = useState<nodeProps>();
    const [nomeNode, setNomeNode] = useState('Aqui vai o Titulo');
    const [nextNode, setNextNode] = useState('');
    const [textoNode, setTextoNode] = useState('Aqui vai o Texto');
    const [options, setOptions] = useState<OptionsProps[]>([]);
    const [actions, setActions] = useState<Actions>();
    const [conditions, setConditions] = useState<conditionsProps | {}>();
    const [intentions, setIntentions] = useState();
    const [tipoNode, setTipoNode] = useState('text');
    const textareaRef = useRef(null);

    // muda o texto do node
    const handleChangeTexto = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextoNode(event.target.value);
        adjustTextareaHeight(event.target);
        setFileConfig((prevFileConfig: any) => ({
            ...prevFileConfig,
            nodes: {
                ...prevFileConfig.nodes,
                [idNode]: {
                    ...prevFileConfig.nodes[idNode],
                    text: textoNode
                }
            }
        }));
    };

    // muda o nome do node
    const toggleEdicao = () => {
        setEditandoNome(!editandoNome);
    };

    // muda o nome do node
    const handleChange = (event: any) => {
        setNomeNode(event.target.value);
    };

    // confirmar a edicao do name
    const handleConfirmarEdicao = () => {
        setEditandoNome(false);
        setNodeReact((prevNode: any) => {
            prevNode.data.label = nomeNode
        });

        setFileConfig((prevFileConfig: any) => ({
            ...prevFileConfig,
            nodes: {
                ...prevFileConfig.nodes,
                [idNode]: {
                    ...prevFileConfig.nodes[idNode],
                    name: nomeNode
                }
            }
        }));
    };

    //ajustando o tamanho do textarea
    const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // mudando o tipo de node
    const handleTypeNode = (type: string) => {
        if (NodeSelected && NodeSelected.id == 'rootNode') {
            return
        }
        setTipoNode(type)
        setFileConfig((prevFileConfig: any) => ({
            ...prevFileConfig,
            nodes: {
                ...prevFileConfig.nodes,
                [idNode]: {
                    ...prevFileConfig.nodes[idNode],
                    type,
                }
            }
        }));
        if (type == 'text') {
            console.log('Texto')
        } else if (type == 'question') {

        } else if (type == "options") {
            setOptions([{
                id: "1",
                view_id: true,
                name: "",
                save_response: "",
                view: true,
                text: "",
                intentions: [
                ],
                actions: {
                    entry_actions: [],
                    exit_actions: []
                },
                next: "",
                err: ""
            }])
        }
    }

    // add nova option
    const addNewOption = () => {
        let id = options.length + 1
        setOptions([...options, {
            id: id.toString(),
            view_id: true,
            name: "",
            save_response: "",
            view: true,
            text: "",
            intentions: [
            ],
            actions: {
                entry_actions: [],
                exit_actions: []
            },
            next: "",
            err: ""
        }])
    }

    // alterando options
    const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string) => {
        const { name, value } = event.target;
        const updatedOptions = options.map(option => {
            if (option.id === id) {
                return { ...option, [name]: value };
            }
            return option;
        });
        setOptions(updatedOptions);
    };

    // alterando o next do node
    const handleChangeNextNode = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        let oldEdge = edges
        oldEdge.push({
            id: `Id${idNode}&Next${value}`,
            source: idNode,
            sourceHandle: "right",
            target: value,
            targetHandle: "left",
            type: "default",
        })
        setEdges(oldEdge)
        setFileConfig((prevFileConfig: any) => ({
            ...prevFileConfig,
            nodes: {
                ...prevFileConfig.nodes,
                [idNode]: {
                    ...prevFileConfig.nodes[idNode],
                    next: value
                }
            }
        }));
    };
    // fechar o modal e atualizar o node
    const handleopenConfig = () => {
        setopenConfigs(false)
        if (tipoNode == 'options') {
            setFileConfig((prevFileConfig: any) => ({
                ...prevFileConfig,
                nodes: {
                    ...prevFileConfig.nodes,
                    [idNode]: {
                        ...prevFileConfig.nodes[idNode],
                        options: options
                    }
                }
            }));
        }
    }

    const reset = () => {
        setNodeSelected(undefined)
        setNomeNode("")
        setTextoNode("")
        setTipoNode("")
        setNextNode("")
        setOptions([])
        setActions({ entry_actions: [], exit_actions: [] })
        setConditions({})
    }

    useEffect(() => {
        reset()
        if (fileConfig) {
            let node = fileConfig.nodes[idNode] ?? false
            if (node) {
                setNodeSelected(node)
                setNomeNode(node.name)
                setTextoNode(node.text)
                setTipoNode(node.type)
                setNextNode(node.next)

                if (node.type == 'text' || node.type == 'question') {
                    setOptions([])
                } else if (node.type == 'options' && node.options) {
                    setOptions(node.options)
                }
                if (node.actions) {
                    setActions(node.actions)
                }
                if (node.conditions) {
                    setConditions(node.conditions)
                }
            }

        }
        adjustTextareaHeight(textareaRef.current);
    }, [idNode])

    useEffect(() => {

    }, [fileConfig])

    return (
        <Container $openconfigs={openConfigs.toString()}>
            <Card>
                <FiX onClick={() => { handleopenConfig() }} />
                <Header>
                    {editandoNome ? (
                        <>
                            <input type='text' value={nomeNode} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <p>{nomeNode}</p>
                        </>
                    )}
                    <div>
                        {editandoNome ? (
                            <>
                                <FiCheck onClick={handleConfirmarEdicao} />
                            </>
                        ) : (
                            <>
                                <FiEdit onClick={toggleEdicao} />
                            </>
                        )}
                    </div>

                </Header>
                <Main>
                    <Menu>
                        <ul>
                            <li className={(menuSelected == 'conteudo') ? 'active' : ''} onClick={() => setmenuSelected('conteudo')}>Conteúdo</li>
                            <li className={(menuSelected == 'condicoes') ? 'active' : ''} onClick={() => setmenuSelected('condicoes')}>Condiçoes de Saída</li>
                            <li className={(menuSelected == 'acoes') ? 'active' : ''} onClick={() => setmenuSelected('acoes')}>Ações</li>
                        </ul>
                    </Menu>
                    {menuSelected === 'conteudo' ? (
                        <Conteudo>
                            {NodeSelected && NodeSelected.id === 'rootNode' ? (
                                <section className='area-texto'>
                                    <div className='message-from'>
                                        Entrada do Usuario
                                    </div>
                                    <div className='area-options'>
                                        <div>
                                            <select name='next' onChange={(event) => handleChangeNextNode(event)} value={nextNode}>
                                                <option value='0'>-</option>
                                                {Object.keys(fileConfig.nodes).map((key) => (
                                                    <option key={key} value={key}>{fileConfig.nodes[key].name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </section>

                            ) : tipoNode === 'text' ? (
                                <section className='area-texto'>
                                    <textarea
                                        ref={textareaRef}
                                        value={textoNode}
                                        onChange={(event: any) => { handleChangeTexto(event) }}
                                        placeholder="Digite aqui..."
                                        style={{ minHeight: '50px', resize: 'none' }}
                                    />
                                    <div className='area-options'>
                                        <div>
                                            <select name='next' onChange={(event) => handleChangeNextNode(event)} value={nextNode}>
                                                <option value='0'>-</option>
                                                {Object.keys(fileConfig.nodes).map((key) => (
                                                    <option key={key} value={key}>{fileConfig.nodes[key].name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </section>
                            ) : tipoNode === 'question' ? (
                                <section className='area-texto'>
                                    <textarea
                                        ref={textareaRef}
                                        value={textoNode}
                                        onChange={(event: any) => { handleChangeTexto(event) }}
                                        placeholder="Digite aqui..."
                                        style={{ minHeight: '50px', resize: 'none' }}
                                    />
                                    <div className='area-options'>
                                        <div>
                                            <select name='next' onChange={(event) => handleChangeNextNode(event)} value={nextNode}>
                                                <option value='0'>-</option>
                                                {Object.keys(fileConfig.nodes).map((key) => (
                                                    <option key={key} value={key}>{fileConfig.nodes[key].name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </section>
                            ) : tipoNode === 'options' ? (
                                <></>
                            ) : (
                                <section className='area-texto'>
                                    em Breve...
                                </section>
                            )}
                        </Conteudo>
                    ) : menuSelected === 'acoes' ? (
                        <Acao>
                            Em Breve
                        </Acao>
                    ) : menuSelected === 'condicoes' ? (
                        <Condicao>
                            <div className='area-options'>
                                <div>
                                    <select name='next' onChange={(event) => handleChangeNextNode(event)} defaultValue={nextNode}>
                                        <option value='0'>-</option>
                                        {Object.keys(fileConfig.nodes).map((key) => (
                                            <option key={key} value={key}>{fileConfig.nodes[key].name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Condicao>
                    ) : (
                        <>
                            Default
                        </>
                    )}
                </Main>
                <section className='area-menu'>
                    <ul>
                        <li className={(tipoNode == 'text') ? 'active' : ''} onClick={() => handleTypeNode('text')}><FiMessageCircle />Texto</li>
                        <li className={(tipoNode == 'question') ? 'active' : ''} onClick={() => handleTypeNode('question')}><FiMessageSquare />Question</li>
                        <li className={(tipoNode == 'options') ? 'active' : ''} onClick={() => handleTypeNode('options')}><FiTrello />Options</li>
                        <li className={(tipoNode == 'list') ? 'active' : ''} onClick={() => handleTypeNode('list')}><FiServer />Lista</li>
                        <li className={(tipoNode == 'image') ? 'active' : ''} onClick={() => handleTypeNode('image')}><FiImage />imagem</li>
                        <li className={(tipoNode == 'video') ? 'active' : ''} onClick={() => handleTypeNode('video')}><FiPlayCircle />Video</li>
                        <li className={(tipoNode == 'anexo') ? 'active' : ''} onClick={() => handleTypeNode('anexo')}><FiUpload />Anexo</li>
                    </ul>
                </section>
            </Card>
        </Container >
    )
}