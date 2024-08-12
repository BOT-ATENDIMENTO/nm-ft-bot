import { useEffect, useRef, useState } from "react";
import {
  Acao,
  Card,
  Condicao,
  Container,
  Conteudo,
  Header,
  Main,
  Menu,
} from "./styles";

import { IconEmail } from "remoteApp/Components";

type MenuFLuxoConfigProps = {
  idNode: string;
  openConfigs: boolean;
  setopenConfigs: any;
  fileEdition: any;
  setFileEdition: any;
  children: React.ReactNode;
  nodeReact: any;
  setNodeReact: any;
  edges: any;
  setEdges: any;
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
};

type Actions = {
  entry_actions?: Action[];
  exit_actions?: Action[];
};

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
  args: [
    {
      comparison?: string;
      key?: string;
      value?: string;
    }
  ];
  source?: string;
};

type OptionsProps = {
  id: string;
  view_id: boolean;
  name: string;
  save_response: string | boolean;
  view: boolean;
  text: string;
  intentions: any[];
  actions: {
    entry_actions: any[];
    exit_actions: any[];
  };
  next: string;
  err: string;
};

export function MenuFLuxoConfig({
  idNode,
  openConfigs = false,
  setopenConfigs,
  fileEdition,
  setFileEdition,
  nodeReact,
  setNodeReact,
  edges,
  setEdges,
}: MenuFLuxoConfigProps) {
  const [editandoNome, setEditandoNome] = useState(false);
  const [menuSelected, setmenuSelected] = useState("conteudo");
  const [NodeSelected, setNodeSelected] = useState<nodeProps>();
  const [nomeNode, setNomeNode] = useState("Aqui vai o Titulo");
  const [nextNode, setNextNode] = useState("");
  const [textoNode, setTextoNode] = useState("Aqui vai o Texto");
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [actions, setActions] = useState<Actions>();
  const [conditions, setConditions] = useState<conditionsProps | {}>();
  const [intentions, setIntentions] = useState();
  const [tipoNode, setTipoNode] = useState("text");
  const textareaRef = useRef(null);

  // muda o texto do node
  const handleChangeTexto = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextoNode(event.target.value);
    adjustTextareaHeight(event.target);
    setFileEdition((prevfileEdition: any) => ({
      ...prevfileEdition,
      nodes: {
        ...prevfileEdition.nodes,
        [idNode]: {
          ...prevfileEdition.nodes[idNode],
          text: textoNode,
        },
      },
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
      prevNode.data.label = nomeNode;
    });

    setFileEdition((prevfileEdition: any) => ({
      ...prevfileEdition,
      nodes: {
        ...prevfileEdition.nodes,
        [idNode]: {
          ...prevfileEdition.nodes[idNode],
          name: nomeNode,
        },
      },
    }));
  };

  //ajustando o tamanho do textarea
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // mudando o tipo de node
  const handleTypeNode = (type: string) => {
    if (NodeSelected && NodeSelected.id == "rootNode") {
      return;
    }
    setTipoNode(type);
    setFileEdition((prevfileEdition: any) => ({
      ...prevfileEdition,
      nodes: {
        ...prevfileEdition.nodes,
        [idNode]: {
          ...prevfileEdition.nodes[idNode],
          type,
        },
      },
    }));
    if (type == "text") {
      console.log("Texto");
    } else if (type == "question") {
    } else if (type == "options") {
      setOptions([
        {
          id: "1",
          view_id: true,
          name: "",
          save_response: "",
          view: true,
          text: "",
          intentions: [],
          actions: {
            entry_actions: [],
            exit_actions: [],
          },
          next: "",
          err: "",
        },
      ]);
    }
  };

  // add nova option
  const addNewOption = () => {
    let id = options.length + 1;
    setOptions([
      ...options,
      {
        id: id.toString(),
        view_id: true,
        name: "",
        save_response: "",
        view: true,
        text: "",
        intentions: [],
        actions: {
          entry_actions: [],
          exit_actions: [],
        },
        next: "",
        err: "",
      },
    ]);
  };

  // alterando options
  const handleChangeOption = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { name, value } = event.target;
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, [name]: value };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  // alterando o next do node
  const handleChangeNextNode = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    let oldEdge = edges;
    oldEdge.push({
      id: `Id${idNode}&Next${value}`,
      source: idNode,
      sourceHandle: "right",
      target: value,
      targetHandle: "left",
      type: "default",
    });
    setEdges(oldEdge);
    setFileEdition((prevfileEdition: any) => ({
      ...prevfileEdition,
      nodes: {
        ...prevfileEdition.nodes,
        [idNode]: {
          ...prevfileEdition.nodes[idNode],
          next: value,
        },
      },
    }));
  };
  // fechar o modal e atualizar o node
  const handleopenConfig = () => {
    setopenConfigs(false);
    if (tipoNode == "options") {
      setFileEdition((prevfileEdition: any) => ({
        ...prevfileEdition,
        nodes: {
          ...prevfileEdition.nodes,
          [idNode]: {
            ...prevfileEdition.nodes[idNode],
            options: options,
          },
        },
      }));
    }
  };

  const reset = () => {
    setNodeSelected(undefined);
    setNomeNode("");
    setTextoNode("");
    setTipoNode("");
    setNextNode("");
    setOptions([]);
    setActions({ entry_actions: [], exit_actions: [] });
    setConditions({});
  };

  useEffect(() => {
    reset();
    if (fileEdition) {
      let node = fileEdition.nodes[idNode] ?? false;
      if (node) {
        setNodeSelected(node);
        setNomeNode(node.name);
        setTextoNode(node.text);
        setTipoNode(node.type);
        setNextNode(node.next);

        if (node.type == "text" || node.type == "question") {
          setOptions([]);
        } else if (node.type == "options" && node.options) {
          setOptions(node.options);
        }
        if (node.actions) {
          setActions(node.actions);
        }
        if (node.conditions) {
          setConditions(node.conditions);
        }
      }
    }
    adjustTextareaHeight(textareaRef.current);
  }, [idNode]);

  useEffect(() => {}, [fileEdition]);

  return (
    <Container $openconfigs={openConfigs.toString()}>
      <Card>
        <IconEmail
          onClick={() => {
            handleopenConfig();
          }}
        />
        <Header>
          {editandoNome ? (
            <>
              <input type="text" value={nomeNode} onChange={handleChange} />
            </>
          ) : (
            <>
              <p>{nomeNode}</p>
            </>
          )}
          <div>
            {editandoNome ? (
              <>
                <IconEmail onClick={handleConfirmarEdicao} />
              </>
            ) : (
              <>
                <IconEmail onClick={toggleEdicao} />
              </>
            )}
          </div>
        </Header>
        <Main>
          <Menu>
            <ul>
              <li
                className={menuSelected == "conteudo" ? "active" : ""}
                onClick={() => setmenuSelected("conteudo")}
              >
                Conteúdo
              </li>
              <li
                className={menuSelected == "condicoes" ? "active" : ""}
                onClick={() => setmenuSelected("condicoes")}
              >
                Condiçoes de Saída
              </li>
              <li
                className={menuSelected == "acoes" ? "active" : ""}
                onClick={() => setmenuSelected("acoes")}
              >
                Ações
              </li>
            </ul>
          </Menu>
          {menuSelected === "conteudo" ? (
            <Conteudo>
              {NodeSelected && NodeSelected.id === "rootNode" ? (
                <section className="area-texto">
                  <div className="message-from">Entrada do Usuario</div>
                  <div className="area-options">
                    <div>
                      <select
                        name="next"
                        onChange={(event) => handleChangeNextNode(event)}
                        value={nextNode}
                      >
                        <option value="0">-</option>
                        {Object.keys(fileEdition.nodes).map((key) => (
                          <option key={key} value={key}>
                            {fileEdition.nodes[key].name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>
              ) : tipoNode === "text" ? (
                <section className="area-texto">
                  <textarea
                    ref={textareaRef}
                    value={textoNode}
                    onChange={(event: any) => {
                      handleChangeTexto(event);
                    }}
                    placeholder="Digite aqui..."
                    style={{ minHeight: "50px", resize: "none" }}
                  />
                  <div className="area-options">
                    <div>
                      <select
                        name="next"
                        onChange={(event) => handleChangeNextNode(event)}
                        value={nextNode}
                      >
                        <option value="0">-</option>
                        {Object.keys(fileEdition.nodes).map((key) => (
                          <option key={key} value={key}>
                            {fileEdition.nodes[key].name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>
              ) : tipoNode === "question" ? (
                <section className="area-texto">
                  <textarea
                    ref={textareaRef}
                    value={textoNode}
                    onChange={(event: any) => {
                      handleChangeTexto(event);
                    }}
                    placeholder="Digite aqui..."
                    style={{ minHeight: "50px", resize: "none" }}
                  />
                  <div className="area-options">
                    <div>
                      <select
                        name="next"
                        onChange={(event) => handleChangeNextNode(event)}
                        value={nextNode}
                      >
                        <option value="0">-</option>
                        {Object.keys(fileEdition.nodes).map((key) => (
                          <option key={key} value={key}>
                            {fileEdition.nodes[key].name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>
              ) : tipoNode === "options" ? (
                <></>
              ) : (
                <section className="area-texto">em Breve...</section>
              )}
            </Conteudo>
          ) : menuSelected === "acoes" ? (
            <Acao>Em Breve</Acao>
          ) : menuSelected === "condicoes" ? (
            <Condicao>
              <div className="area-options">
                <div>
                  <select
                    name="next"
                    onChange={(event) => handleChangeNextNode(event)}
                    defaultValue={nextNode}
                  >
                    <option value="0">-</option>
                    {Object.keys(fileEdition.nodes).map((key) => (
                      <option key={key} value={key}>
                        {fileEdition.nodes[key].name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Condicao>
          ) : (
            <>Default</>
          )}
        </Main>
        <section className="area-menu">
          <ul>
            <li
              className={tipoNode == "text" ? "active" : ""}
              onClick={() => handleTypeNode("text")}
            >
              <IconEmail />
              Texto
            </li>
            <li
              className={tipoNode == "question" ? "active" : ""}
              onClick={() => handleTypeNode("question")}
            >
              <IconEmail />
              Question
            </li>
            <li
              className={tipoNode == "options" ? "active" : ""}
              onClick={() => handleTypeNode("options")}
            >
              <IconEmail />
              Options
            </li>
            <li
              className={tipoNode == "list" ? "active" : ""}
              onClick={() => handleTypeNode("list")}
            >
              <IconEmail />
              Lista
            </li>
            <li
              className={tipoNode == "image" ? "active" : ""}
              onClick={() => handleTypeNode("image")}
            >
              <IconEmail />
              imagem
            </li>
            <li
              className={tipoNode == "video" ? "active" : ""}
              onClick={() => handleTypeNode("video")}
            >
              <IconEmail />
              Video
            </li>
            <li
              className={tipoNode == "anexo" ? "active" : ""}
              onClick={() => handleTypeNode("anexo")}
            >
              <IconEmail />
              Anexo
            </li>
          </ul>
        </section>
      </Card>
    </Container>
  );
}
