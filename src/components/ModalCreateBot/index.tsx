import { useState } from "react";

import { Card, CardMaxBot, Container } from "./styles";

import botService from "../../services/fluxoServices";

export function ModalCreateBot({
  isActive = false,
  limiteIsActive = false,
  setModalActive,
  listBots,
  setCarregando,
}: any) {
  const [btnCriar, setBtnCriar] = useState("Criar");
  const [name, setName] = useState("");
  const [plataform, setPlataform] = useState("");
  const [description, setDescription] = useState("");
  function handleInativeModal() {
    setModalActive(false);
  }
  async function saveNewBot() {
    const data = {
      name,
      plataform,
      description,
    };
    if (name == "" || plataform == "" || description == "") {
      console.log("Preencha todos os campos");
      return;
    }
    setCarregando(true);
    setBtnCriar("Criando...");
    handleInativeModal();
    const bot = await botService.createBot(data);
    listBots();
    setCarregando(false);
  }

  return (
    <Container>
      <Card>
        {limiteIsActive ? (
          <CardMaxBot>
            <button onClick={handleInativeModal} />
            <h1>LIMITE MAXIMO DE BOT ATINGIDO</h1>
            <h5>Para poder Criar novos Bots, Contrate um pacote melhor.</h5>
          </CardMaxBot>
        ) : (
          <>
            <div className="header">CRIANDO BOT</div>
            <div className="section">
              <label>Informacoes</label>
              <div>
                <label>Nome do Bot</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label>Plataforma</label>
                <select
                  value={plataform}
                  onChange={(e: any) => {
                    setPlataform(e.target.value);
                  }}
                >
                  <option value="">-</option>
                  <option value="simple">SimpleBot</option>
                  <option value="chatpro">ChatPro</option>
                  <option value="cdn">CDN</option>
                </select>
              </div>
              <div>
                <label>Descrição</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e: any) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="footer">
              <button title="Fechar" onClick={handleInativeModal}></button>
              <button title={btnCriar} onClick={saveNewBot}></button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
}
