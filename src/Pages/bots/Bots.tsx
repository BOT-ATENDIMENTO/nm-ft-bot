import { Suspense, useEffect, useState } from "react";

import {
  Button,
  CardBetween,
  IconAdd,
  Loading,
  IconEdit,
  IconUsers,
  Text,
  IconSettings,
  TableContent,
  ContentBody,
} from "remoteApp/Components";
import { ModalCreateBot } from "../../components/ModalCreate/Modal";
import botService from "../../services/fluxoServices";
import { Link } from "react-router-dom";

export function Bot() {
  const [isOpen, setIsOpen] = useState(false);
  const [bots, setBots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchBots() {
    const response = await botService.findAll();
    console.log("response", response);
    setBots(response?.bots);
    // .then((response) => {
    //   console.log("response", response.data);
    //   setBots(response.data);
    // })
    // .catch((error) => {
    //   console.log("error", error);
    // });
    setIsLoading(false);
    return response;
  }

  function handleModal() {
    console.log("handleModal");
    console.log("isOpen", isOpen);
    setIsOpen(true);
  }

  function closeModal() {
    console.log("closeModal", isOpen);
    setIsOpen(false);
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBots();
      console.log("data", data);
      setBots(data.bots);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const columns = ["name", "plataform", "description", "editar"];
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <CardBetween bg="transparent">
          <Text text="Fluxos" />
          <Button
            onClick={handleModal}
            backgroundColor="tertiary"
            color="primary"
          >
            <IconAdd size={25} />
            Novo
          </Button>
        </CardBetween>
        <ModalCreateBot
          isActive={false}
          limiteIsActive={false}
          setModalActive={() => {}}
          listBots={() => {}}
          setCarregando={() => {}}
          closeModal={closeModal}
          isOpen={isOpen}
        />
        <ContentBody containerSize="100%" contentSize="100%" bg="">
          {isLoading ? (
            <Loading />
          ) : (
            <TableContent
              data={bots.map((item) => {
                return {
                  name: item.name,
                  plataform: item.plataform,
                  description: item.description,
                  editar: (
                    <div style={{ gap: "20px", display: "flex" }}>
                      <IconUsers size={25} />
                      {/* <Link to={`/fluxo-bot/${item.token}`}><FiEdit /></Link> */}
                      <Link to={`/fluxo-bot/${item.token}`}>
                        <IconEdit size={29} />
                      </Link>
                      <IconSettings size={25} />
                    </div>
                  ),
                };
              })}
              columns={columns}
            />
          )}
        </ContentBody>
      </div>
    </Suspense>
  );
}
