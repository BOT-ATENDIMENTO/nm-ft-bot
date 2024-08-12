import { Fragment, useState } from "react";
import * as yup from "yup";
import {
  Button,
  CardBetween,
  Form,
  IconAdd,
  InputText,
  Loading,
  ModalComponent,
  ModalTeste,
  Text,
  Titulo,
  Row,
  SelectInput,
} from "remoteApp/Components";

import botService from "../../services/fluxoServices";

interface ModalCreateBotProps {
  isActive?: boolean;
  limiteIsActive?: boolean;
  setModalActive: any;
  listBots: any;
  setCarregando: any;
  closeModal: () => void;
  isOpen: boolean;
}

export function ModalCreateBot({
  isActive = false,
  limiteIsActive = false,
  setModalActive,
  listBots,
  setCarregando,
  isOpen,
  closeModal,
}: ModalCreateBotProps) {
  const [plataform, setPlataform] = useState("");
  const handleSelectChange = (value: string) => {
    console.log("value", value);
    setPlataform(value);
  };

  const options = ["", "SimpleBot", "ChatPro", "CDN"];

  const AddFormSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    plataform: yup.string(),
    description: yup.string().required("Campo obrigatório"),
  });

  console.log("AddFormSchema", AddFormSchema);

  async function handleSaveBot(val) {
    let data = {
      name: val.name,
      plataform: plataform,
      description: val.description,
    };
    // if (name == "" || plataform == "" || description == "") {
    //   console.log("Preencha todos os campos");
    //   return;
    // }
    setCarregando(true);

    const bot = await botService.createBot(data);
    listBots();
    setCarregando(false);
    closeModal();
    return bot;
  }

  return (
    <>
      <ModalComponent isOpen={isOpen} closeModal={closeModal}>
        <Titulo
          title="Crie seu fluxo"
          center="center"
          font="primary"
          color="secondary"
          size={20}
        />
        <Form onSubmit={handleSaveBot} validationSchema={AddFormSchema}>
          {(props, touched) => (
            <Fragment>
              <InputText
                placeholder="Digite o nome do seu fluxo"
                name="name"
                label="Nome do fluxo"
                errorMessage={props.errors.name}
                onChange={(e) => props.setFieldValue("name", e.target.value)}
              />

              <SelectInput
                name="plataform"
                value={plataform}
                options={options}
                label="Plataforma"
                onChange={handleSelectChange}
              />

              <InputText
                placeholder="Digite sua descrição"
                name="description"
                type="text"
                label="Descrição"
                errorMessage={props.errors.description}
                error={props.errors.description}
                onChange={(e) =>
                  props.setFieldValue("description", e.target.value)
                }
              />
              <Row>
                <Button
                  children="Cadastrar"
                  type="submit"
                  size="size"
                  backgroundColor="tertiary"
                  color="primary"
                />
              </Row>
            </Fragment>
          )}
        </Form>
      </ModalComponent>
    </>
  );
}
